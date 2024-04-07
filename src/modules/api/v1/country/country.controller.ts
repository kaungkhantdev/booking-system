import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@dtos/response.decorator';
import { CountryService } from './country.service';

@ApiTags('Country')
@Controller()
export class CountryController {
  constructor(private service: CountryService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully got countries list.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ResponseMessage('Thanks you, your registration is success.')
  getAll() {
    return this.service.findCountries();
  }
}
