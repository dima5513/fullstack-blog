import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { fileStorage } from './storage'
import { Auth } from '../guards/jwt.guard'
import { Repository } from 'typeorm'
import { User } from '../user/entity/user.entity'
import * as path from 'path'
import { ConfigService } from '@nestjs/config'
import * as process from 'process'

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post()
  @Auth()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: fileStorage(),
    })
  )
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
          }),
        ],
      })
    )
    avatar: Express.Multer.File,
    @Req() req
  ) {
    return this.fileService.update(req.user.id, avatar)
  }
}
