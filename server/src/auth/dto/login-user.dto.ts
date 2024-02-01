import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsNotEmpty({
    message: 'Почта не должна быть пустой',
  })
  @IsEmail(
    {},
    {
      message: 'Почта не соответствует формату',
    }
  )
  email: string
  @IsNotEmpty({
    message: 'Пароль не должен быть пустым',
  })
  @MinLength(6, {
    message: 'Пароль должен быть длиннее или равен 6 символам',
  })
  password: string
}
