import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async setPasswordForGoogleUser(userAddress: string, password: string) {
    return this.mailerService.sendMail({
      to: userAddress,
      subject: 'Тестовое сообщение',
      template: './set-password-for-google-user.template.ejs',
      context: {
        password,
      },
    })
  }
}
