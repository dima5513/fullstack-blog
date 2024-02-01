import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('CLIENT_ID'),
      clientSecret: configService.get('CLIENT_SECRET'),
      callbackURL: 'http://localhost:3001/api/auth/google/callback',
      passReqToCallback: true,
      scope: ['email', 'profile'],
    })
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<any> {
    try {
      const user = {
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        avatar: profile.photos[0].value,
      }
      done(null, user)
    } catch (e) {
      done(e, null)
    }
  }
}
