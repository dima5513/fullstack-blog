import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesController } from './files.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entity/user.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class FilesModule {}
