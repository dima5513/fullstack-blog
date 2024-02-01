import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { CommentModule } from './comment/comment.module'
import { FilesModule } from './files/files.module'
import { PostsModule } from './post/post.module'
import { UserModule } from './user/user.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'mrfreemen5000@gmail.com',
          pass: 'ztrl uehp kwjc vsos',
        },
      },
      defaults: {
        from: 'blog@test.com',
      },
      template: {
        dir: path.resolve(__dirname, '..', 'src', 'email', 'templates'),
        adapter: new EjsAdapter(),
      },
    }),
    AuthModule,
    UserModule,
    FilesModule,
    PostsModule,
    CategoryModule,
    CommentModule,
  ],
})
export class AppModule {}
