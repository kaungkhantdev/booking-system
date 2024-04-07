import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from '@dtos/response.decorator';
import { ClassService } from './class.service';

@ApiTags('Class')
@Controller()
export class ClassController {
  constructor(private service: ClassService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully got class list.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBearerAuth()
  @ResponseMessage('The user has been successfully got class list.')
  getAll() {
    return this.service.findClasses();
  }
}
