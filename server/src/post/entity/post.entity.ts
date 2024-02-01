import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Category } from '../../category/entities/category.entity'
import { Comment } from '../../comment/entity/comment.entity'
import { User } from '../../user/entity/user.entity'

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[]

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'category_name', referencedColumnName: 'name' })
  category: Category

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date
}
