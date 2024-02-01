import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon from 'argon2'
import { EmailService } from 'src/email/email.service'
import { GoogleProfile } from 'src/types/google.types'
import { createTemporaryPassword } from 'src/utils/temporary-password'
import { Repository } from 'typeorm'
import { UserDto } from '../user/dto/user.dto'
import { User } from '../user/entity/user.entity'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
    private emailService: EmailService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async me(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        email: true,
        createdAt: true,
        username: true,
        avatar: true,
        googleId: true,
        id: true,
      },
    })

    return user
  }

  async login(user: LoginUserDto, res): Promise<UserDto> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        username: true,
        avatar: true,
        password: true,
      },
    })

    console.log(foundUser)

    console.log(foundUser)
    if (!foundUser) throw new NotFoundException('Такого пользователя нет!')

    const isVerify = await argon.verify(foundUser.password, user.password)

    if (!isVerify) throw new BadRequestException('Логин или пароль неверный')

    const token = this.jwtService.sign({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    })
    res.cookie('token', token, {
      httpOnly: false,
    })
    const { id, password, ...result } = foundUser
    return result
  }

  async register(user: RegisterUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    })
    if (existingUser)
      throw new BadRequestException('Такой пользователь уже существует!')

    const passwordHash = await argon.hash(user.password)

    const createdUser = await this.userRepository.save({
      ...user,
      password: passwordHash,
    })

    return createdUser
  }

  async googleLogin(user: GoogleProfile) {
    const foundedUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    })
    let token: string
    if (!foundedUser) {
      const temporaryPassword = createTemporaryPassword()
      const passwordHash = await argon.hash(temporaryPassword)
      const newUserFromGoogle: RegisterUserDto = {
        email: user.email,
        googleId: user.googleId,
        password: passwordHash,
        avatar: user.avatar,
        username: user.lastName
          ? `${user.firstName} ${user.lastName}`
          : `${user.firstName}`,
      }

      await this.emailService.setPasswordForGoogleUser(
        user.email,
        temporaryPassword
      )

      const createdUser = await this.userRepository.save(newUserFromGoogle)

      token = this.jwtService.sign({
        sub: createdUser.id,
        email: createdUser.email,
      })
    } else {
      token = this.jwtService.sign({
        sub: foundedUser.id,
        email: foundedUser.email,
      })
    }

    return token
  }

  async logout(req, res) {
    res.clearCookie('token')
  }
}
