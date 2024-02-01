import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Post } from '../../post/entity/post.entity'

@Entity('category')
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[]
}
