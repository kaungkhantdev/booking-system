import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class BookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  class_id: string;
}
