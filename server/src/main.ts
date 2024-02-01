import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common'

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import type { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface'
import { NestFactory, Reflector } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { join } from 'path'
import * as process from 'process'
import { AppModule } from './app.module'
const options: CorsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.enableCors(options)
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (e: ValidationError[]) => {
        const validationResult = e.map((error) => {
          return {
            property: error.property,
            errors: Object.values(error.constraints),
          }
        })
        console.log(e)
        throw new BadRequestException(validationResult, 'ValidationError')
      },
    })
  )
  app.setGlobalPrefix(process.env.API_PREFIX)
  app.use(cookieParser())
  app.use(
    `/${process.env.API_PREFIX}/uploads`,
    express.static(join(__dirname, '..', 'uploads'))
  )
  // app.useGlobalFilters(new AuthFilter())
  await app.listen(3001)
}
bootstrap()
