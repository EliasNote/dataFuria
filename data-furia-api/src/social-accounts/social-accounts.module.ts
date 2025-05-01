import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { SocialAccount } from '../social-accounts/entity/SocialAccount';
import { User } from '../users/entity/User';
import { SocialAccountsService } from './social-accounts.service';
import { SocialAccountsController } from './social-accounts.controller';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    TypeOrmModule.forFeature([SocialAccount, User]),
  ],
  providers: [FacebookStrategy, GoogleStrategy, SocialAccountsService],
  controllers: [SocialAccountsController],
  exports: [SocialAccountsService],
})
export class SocialAccountsModule {}
