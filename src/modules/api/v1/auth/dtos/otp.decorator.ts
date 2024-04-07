import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
