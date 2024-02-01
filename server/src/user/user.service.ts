import { Get, Injectable, Post } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
}
