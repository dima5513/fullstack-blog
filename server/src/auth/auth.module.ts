import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GoogleStrategy } from 'src/strategies/google.strategy'
import { getJwtConfig } from '../config/jwt.config'
import { JwtStrategy } from '../strategies/jwt.strategy'
import { User } from '../user/entity/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { EmailService } from 'src/email/email.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, EmailService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: getJwtConfig,
    }),
    ConfigModule,
  ],
})
export class AuthModule {}
