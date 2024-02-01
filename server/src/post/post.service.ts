import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryService } from '../category/category.service'
import { Category } from '../category/entities/category.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { Post } from './entity/post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private categoryService: CategoryService,
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async getPosts() {
    const posts = await this.postRepository.find({
      relations: ['user', 'category', 'comments'],
      order: {
        createdAt: 'DESC',
      },
    })
    return posts
  }

  async getPostsByCategory(category: string) {
    return await this.categoryService.getPostsByCategory(category)
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'comments', 'comments.user'],
    })

    return post ?? new BadRequestException('Такого поста нет!')
  }

  async getUserCreatedPosts(userId: number) {
    return await this.postRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    })
  }

  async create(post: CreatePostDto, userId: number) {
    const foundedPost = await this.postRepository.findOne({
      where: {
        title: post.title,
      },
    })
    if (foundedPost)
      throw new BadRequestException('Пост с таким зоголовком уже создан')
    return await this.postRepository.save({
      ...post,
      user: {
        id: userId,
      },
    })
  }

  async deletePostById(id: number) {
    return await this.postRepository.delete(id)
  }
}
