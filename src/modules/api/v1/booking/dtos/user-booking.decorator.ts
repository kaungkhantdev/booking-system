import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
