import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';
import { AccountEntity } from 'src/entities/account.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
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
  providers: [AccountService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AccountModule {}