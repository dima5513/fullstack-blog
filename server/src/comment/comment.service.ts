import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dto/create-comment.dto'
import { Comment } from './entity/comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}

  async addComment(comment: CreateCommentDto, userId: number) {
    console.log(comment)

    const createdComment = await this.commentRepository.save({
      ...comment,
      post: {
        id: comment.post,
      },
      user: {
        id: userId,
      },
    })
    return this.commentRepository.findOne({
      where: { id: createdComment.id },
      relations: ['user'],
    })
  }

  async deleteComment(id: string) {
    return await this.commentRepository.delete(id)
  }
}
