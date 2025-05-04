import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import puppeteer from 'puppeteer-extra';
const StealthPlugin = require('puppeteer-extra-plugin-stealth')();
import * as cheerio from 'cheerio';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './entity/User';
import { SocialAccountsService } from 'src/social-accounts/social-accounts.service';
import { SocialAccount } from 'src/social-accounts/entity/SocialAccount';
import { AiService } from 'src/ai/ai.service';
import { LinkEvaluation } from './entity/LinkEvaluation';
import { LinkEvaluationService } from './link-evaluations.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private socialService: SocialAccountsService,
    private aiService: AiService,
    private linkEvaluationService: LinkEvaluationService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async findUserByCpf(cpf: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { cpf: cpf },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async validateAI(url: string, cpf: string) {
    const user = await this.userRepo.findOne({
      where: { cpf: cpf },
      relations: ['socialAccounts'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const socialContent = await this.getSocialContent(user.socialAccounts);
    const websiteContent = await this.extractWebsite(url);

    const score = await this.aiService.pesquisar(
      user,
      socialContent,
      websiteContent,
    );

    const evaluation = new LinkEvaluation();
    evaluation.url = url;
    evaluation.score = score;
    evaluation.user = user;
    await this.linkEvaluationService.create(evaluation);
  }

  async getSocialContent(accounts: SocialAccount[]) {
    const allSocialData: Record<string, any> = {};

    if (!accounts || accounts.length === 0) {
      console.log('Nenhuma conta social fornecida para buscar conteúdo.');
      return allSocialData;
    }

    await Promise.all(
      accounts.map(async (account) => {
        try {
          const data = await this.socialService.fetchSocialData(account);
          allSocialData[account.provider] = data;
        } catch (error) {
          console.error(
            `Erro ao buscar dados do ${account.provider} para o usuário ${account.user.id}:`,
            error.message,
          );
          allSocialData[account.provider] = {
            error: `Falha ao buscar dados: ${error.message}`,
          };
        }
      }),
    );

    return allSocialData;
  }

  async extractWebsite(url: string): Promise<string> {
    puppeteer.use(StealthPlugin);
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (error) {
      console.error(`Error navigating to ${url}:`, error);
      await browser.close();
      throw new BadRequestException(`Failed to load page content from ${url}`);
    }

    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);

    const selectors = [
      '#main',
      '#content',
      '.main-content',
      '.article-body',
      '.post-content',
      'main',
      'article',
      'div[data-testid="primaryColumn"]',
      'article[data-testid="tweet"]',
      '[id*="content"]',
      '[class*="content"]',
      'body',
    ];

    let textContent = '';

    for (const selector of selectors) {
      textContent = $(selector).text();
      if (textContent) {
        $(selector).find('script, style').remove();
        textContent = $(selector).text();
        if (textContent.trim()) {
          break;
        }
      }
    }

    const cleanedText = textContent
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return cleanedText;
  }
}
