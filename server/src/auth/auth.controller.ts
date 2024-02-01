import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { GoogleOAuthGuard } from 'src/guards/google.guard'
import { GoogleProfile } from 'src/types/google.types'
import { Auth } from '../guards/jwt.guard'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() user: LoginUserDto, @Res({ passthrough: true }) res) {
    return this.authService.login(user, res)
  }
  @Post('register')
  register(@Body() userDto: RegisterUserDto) {
    return this.authService.register(userDto)
  }

  @Auth()
  @Get('me')
  me(@Req() req) {
    return this.authService.me(req.user.sub)
  }
  @Auth()
  @Get('logout')
  logout(@Req() req, @Res({ passthrough: true }) res) {
    return this.authService.logout(req, res)
  }
  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleLogin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.googleLogin(req.user as GoogleProfile)
    return res.cookie('token', token).redirect('http://localhost:5173/')
  }
}
