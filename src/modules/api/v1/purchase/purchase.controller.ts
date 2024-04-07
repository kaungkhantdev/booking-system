import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from '@dtos/response.decorator';
import { PurchaseService } from './purchase.service';
import { BuyPackageDto } from './dtos/buy-package.decorator';

@ApiTags('Purchase')
@Controller()
export class PurchaseController {
  constructor(private service: PurchaseService) {}

  @Post('buy-package')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully got packages list.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBearerAuth()
  @ResponseMessage('The user has been successfully got packages list.')
  buyPackage(@Body() data: BuyPackageDto) {
    return this.service.buyPackage(data);
  }
}
