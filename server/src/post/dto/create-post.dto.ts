import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { Category } from '../../category/entities/category.entity'
import { User } from '../../user/entity/user.entity'
export class CreatePostDto {
  id: number

  @MinLength(10, {
    message: 'Заголовок поста должен быть не меньше 10 символов',
  })
  @MaxLength(150, {
    message: 'Заголовок поста не должен быть длиннее 150 символов',
  })
  @IsNotEmpty({
    message: 'Заголовок поста должен присутствовать',
  })
  title: string
  @IsNotEmpty({
    message: 'Контент поста не должен быть пустым',
  })
  @MinLength(100, {
    message: 'Количество символов для контента должно быть не меньше 100',
  })
  @MaxLength(10000, {
    message: 'Длина конента не должна быть длиннее 10000 символов',
  })
  content: string
  user: User
  category: Category
  createAt: Date
}
