import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';
import { AccountEntity } from 'src/entities/account.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]),
  JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')as any,
        },
      }),
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}