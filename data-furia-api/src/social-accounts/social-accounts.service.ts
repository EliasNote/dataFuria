import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialAccount } from '../social-accounts/entity/SocialAccount';
import { User } from '../users/entity/User';
import axios from 'axios';
import { google } from 'googleapis';

@Injectable()
export class SocialAccountsService {
  constructor(
    @InjectRepository(SocialAccount)
    private socialRepo: Repository<SocialAccount>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async linkAccount(
    userId: number,
    provider: string,
    profileId: string,
    accessToken: string,
    refreshToken: string,
  ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    const sa = this.socialRepo.create({
      user,
      provider,
      profileId,
      accessToken,
      refreshToken,
    });
    return this.socialRepo.save(sa);
  }

  async fetchSocialData(sa: SocialAccount) {
    switch (sa.provider) {
      case 'facebook':
        return this.getFacebookData(sa);

      case 'google':
        return this.getGoogleData(sa);

      default:
        throw new BadRequestException(`Provider ${sa.provider} not supported`);
    }
  }

  async getFacebookData(sa: SocialAccount) {
    try {
      const { data } = await axios.get(process.env.FACEBOOK_GRAPH_URL!, {
        params: {
          fields:
            'id,name,email,posts.limit(5){message,created_time},likes.limit(5){name}',
          access_token: sa.accessToken,
        },
      });
      return data;
    } catch (error) {
      console.error(
        `Erro ao buscar dados do Facebook para social account ${sa.id}:`,
        error.response?.data || error.message,
      );
      throw new Error(
        `Falha ao buscar dados do Facebook: ${error.response?.data?.error?.message || error.message}`,
      );
    }
  }

  async getGoogleData(sa: SocialAccount) {
    const oauth2 = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    oauth2.setCredentials({ refresh_token: sa.refreshToken });
    const { credentials } = await oauth2.refreshAccessToken();
    oauth2.setCredentials({ access_token: credentials.access_token });

    const peopleApi = google.people({ version: 'v1', auth: oauth2 });

    let fieldsArray = [
      'names',
      'emailAddresses',
      'organizations',
      'occupations',
      'biographies',
      'urls',
      'metadata',
    ];

    const personFields = fieldsArray.join(',');

    const { data: profile } = await peopleApi.people.get({
      resourceName: 'people/me',
      personFields,
    });

    return profile;
  }
}
