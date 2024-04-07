import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: string;
}
