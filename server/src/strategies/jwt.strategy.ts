import { Injectable, Req } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'
import { User } from '../user/entity/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),

      // jsonWebTokenOptions: {
      //   // this object maps to jsonwebtoken verifier options
      //   ignoreNotBefore: true,
      //   // ...
      //   // maybe ignoreExpiration too?
      // },
    })
  }

  private static extractJWT(req): string | null {
    if (req.cookies && 'token' in req.cookies) {
      console.log('extract jwt: ', req.cookies.token)
      return req.cookies.token
    }
    return null
  }
  async validate(payload, @Req() req) {
    return payload
  }
}
