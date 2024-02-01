import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsNotEmpty()
  @MaxLength(15)
  username: string
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string
  @IsString()
  @IsOptional()
  googleId?: string
  @IsString()
  @IsOptional()
  avatar?: string
}
