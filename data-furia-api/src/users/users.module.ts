import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entity/User';
import { Produto } from './entity/Produto';
import { HttpModule } from '@nestjs/axios';
import { SocialAccountsModule } from 'src/social-accounts/social-accounts.module';
import { AiService } from 'src/ai/ai.service';

@Module({
  imports: [
    HttpModule,
    SocialAccountsModule,
    TypeOrmModule.forFeature([User, Produto]),
  ],
  controllers: [UsersController],
  providers: [AiService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
