import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entity/post.entity'
import { Category } from '../category/entities/category.entity'
import { CategoryService } from '../category/category.service'
import { Comment } from '../comment/entity/comment.entity'

@Module({
  controllers: [PostController],
  providers: [PostService, CategoryService],
  imports: [TypeOrmModule.forFeature([Post, Category, Comment])],
})
export class PostsModule {}
