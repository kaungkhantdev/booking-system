import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CancelBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  class_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  booking_id: string;
}
