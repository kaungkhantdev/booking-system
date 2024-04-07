import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PackageService } from './package.service';
import { ResponseMessage } from '@dtos/response.decorator';

@ApiTags('Package')
@Controller()
export class PackageController {
  constructor(private service: PackageService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully got packages list.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ResponseMessage('The user has been successfully got packages list.')
  getAll() {
    return this.service.findPackages();
  }
}
