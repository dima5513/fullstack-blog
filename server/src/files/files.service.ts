import { Injectable } from '@nestjs/common'
import { CreateFileDto } from './dto/create-file.dto'
import { Repository } from 'typeorm'
import { User } from '../user/entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  //TODO: Придумать как получать файл с сервера, аля return 'protocol://host:port/api/avatars/filename.ext'
  async update(userId: number, avatar: Express.Multer.File) {
    return await this.userRepository.update(
      { id: userId },
      {
        avatar: avatar.filename,
      }
    )
  }
}
