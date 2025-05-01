import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get('FACEBOOK_CLIENT_ID'),
      clientSecret: config.get('FACEBOOK_CLIENT_SECRET'),
      callbackURL: config.get('FACEBOOK_CALLBACK_URL'),
      scope: ['email', 'public_profile', 'user_posts', 'user_likes'],
      profileFields: ['id', 'displayName', 'emails'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return { profile, accessToken, refreshToken: refreshToken };
  }
}
