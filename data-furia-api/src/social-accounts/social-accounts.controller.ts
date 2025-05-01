import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SocialAccountsService } from './social-accounts.service';

@Controller('social')
export class SocialAccountsController {
  constructor(private socialService: SocialAccountsService) {}

  @Get(':userId/facebook')
  @UseGuards(AuthGuard('facebook'))
  loginFacebook() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@Param('userId') userId: string, @Req() req: any) {
    const { profile, accessToken, refreshToken } = req.user;
    await this.socialService.linkAccount(
      +userId,
      'facebook',
      profile.id,
      accessToken,
      refreshToken,
    );
    return { linked: true };
  }

  @Get(':userId/google')
  async loginGoogle(@Param('userId') userId: string, @Res() res: Response) {
    const params: Record<string, string> = {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      state: userId,
      scope: 'openid email profile',
    };

    res.redirect(
      `${process.env.GOOGLE_OAUTH2}?${new URLSearchParams(params).toString()}`,
    );
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Query('state') userId: string, @Req() req: any) {
    const { profile, accessToken, refreshToken } = req.user;
    await this.socialService.linkAccount(
      +userId,
      'google',
      profile.id,
      accessToken,
      refreshToken,
    );
    return { linked: true };
  }
}
