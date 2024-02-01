import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common'
import { Auth } from '../guards/jwt.guard'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @Auth()
  async addComment(@Body() comment: CreateCommentDto, @Req() req) {
    const userId: number = parseInt(req.user.sub)
    return this.commentService.addComment(comment, userId)
  }

  @Auth()
  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id)
  }
}
