import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ name: 'google_id', nullable: true, default: null })
  googleId: string

  @Column()
  email: string

  @Column({ nullable: true })
  avatar: string

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date

  // constructor(partial: Partial<User>) {
  //   Object.assign(this, partial)
  // }
}
