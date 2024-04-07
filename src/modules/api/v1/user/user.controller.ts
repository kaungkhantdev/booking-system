import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from '@dtos/response.decorator';
import { UserService } from './user.service';
import { ProfileDto } from './dtos/user.dtos';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully got profile.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBearerAuth()
  @ResponseMessage('The user has been successfully got profile.')
  getProfile(@Body() data: ProfileDto) {
    return this.service.findByProfileId(data.user_id);
  }
}
