import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    dotenv.config();

    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      service: process.env.MAIL_SERVICE,
      port: parseInt(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  /** send mail service */
  async sendEmail(
    to: string,
    subject: string,
    templateVariables: object,
    templateName: string = 'otp-mail',
  ): Promise<void> {
    /** file path */
    const templatePath = path.join(
      __dirname + '/templates/' + templateName + '.hbs',
    );

    /** compile hbs */
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
    const html = template(templateVariables);

    /** mail options */
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html, // Use the HTML content for the email body
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  }
}
