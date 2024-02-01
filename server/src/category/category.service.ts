import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async getPostsByCategory(categoryName: string) {
    const categoryPosts = await this.categoryRepository.findOne({
      where: { name: categoryName },
      relations: [
        'posts',
        'posts.user',
        'posts.comments',
        'posts.comments.user',
      ],
      order: {
        posts: {
          createdAt: 'ASC',
        },
      },
    })

    // const categoryPosts = await this.categoryRepository
    //   .createQueryBuilder('category')
    //
    //   .leftJoinAndSelect('category.posts', 'post')
    //   .leftJoinAndSelect('post.user', 'userpost')
    //
    //   .leftJoinAndSelect('post.comments', 'comment')
    //   .leftJoinAndSelect('comment.user', 'user')
    //
    //   .where('category.name = :name', { name: categoryName })
    //   .select(['category', 'post', 'post.user', 'post.id'])
    //   .getOne()
    console.log(categoryPosts)
    if (!categoryPosts)
      throw new BadRequestException('Такой категории не существует')

    return categoryPosts.posts
  }
}
