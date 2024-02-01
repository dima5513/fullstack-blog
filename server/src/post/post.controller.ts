import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { Auth } from '../guards/jwt.guard'
import { CreatePostDto } from './dto/create-post.dto'
import { PostService } from './post.service'

@Controller('posts')
export class PostController {
  constructor(private postsService: PostService) {}

  @Get()
  getByCategory(@Query('category') category) {
    return category
      ? this.postsService.getPostsByCategory(category)
      : this.postsService.getPosts()
  }
  @Auth()
  @Post()
  create(
    @Body() post: CreatePostDto,
    @Req() req,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.postsService.create(post, req.user.sub)
    // return res.redirect(`http://localhost:5173/posts/${createdPost.id}`)
    // Эта строчка вызовет на клиенте запрос на редирект т.к поле redirect моего fetch api указывает на следование перенаправлениям, и при попытке получить ресурс по ссылке выше, уйдёт запрос options(???) и я получу ошибку cors(???) на сервере разработки клиента. Как отключить корс или хотя бы выставить заголовок Sec-Fetch-Mode в no-cors в конфиге вита я не раобрался
  }

  @Auth()
  @Get('/my-posts')
  getUserCreatedPosts(@Req() req) {
    return this.postsService.getUserCreatedPosts(req.user.sub)
  }

  @Get(':id')
  getPostByCategory(@Param('id') id: string) {
    const postId = parseInt(id)

    return this.postsService.getPostById(postId)
  }

  @Auth()
  @Delete(':id')
  deletePostById(@Param('id') id: string) {
    return this.postsService.deletePostById(parseInt(id))
  }
}
