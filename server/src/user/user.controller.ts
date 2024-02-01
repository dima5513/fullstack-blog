import { Controller, UploadedFile } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users') //http://localhost:3001/api/users
export class UserController {
  constructor(private readonly userService: UserService) {}
}
