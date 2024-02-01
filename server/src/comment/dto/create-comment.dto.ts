import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  body: string
  @IsNumber()
  post: number
}
