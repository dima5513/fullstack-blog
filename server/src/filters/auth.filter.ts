import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common'
import { Catch } from '@nestjs/common'

@Catch(UnauthorizedException)
export class AuthFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const response = host.switchToHttp().getResponse()
    const request = host.switchToHttp().getRequest()

    console.log(request.get('Origin') + '/auth/login')
    response.redirect('https://google.com')
  }
}
