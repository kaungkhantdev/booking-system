import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from '@dtos/response.decorator';
import { BookingService } from './booking.service';
import { BookingDto } from './dtos/booking.decorator';
import { CancelBookingDto } from './dtos/cancel-booking.decorator';
import { UserBookingDto } from './dtos/user-booking.decorator';

@ApiTags('Booking')
@Controller()
export class BookingController {
  constructor(private service: BookingService) {}

  @Post('user')
  @ApiResponse({
    status: 200,
    description: 'The user booked lists.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBearerAuth()
  @ResponseMessage('Booking')
  get(@Body() data: UserBookingDto) {
    return this.service.findByUserId(data);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The user action started.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBearerAuth()
  @ResponseMessage('Booking')
  booking(@Body() data: BookingDto) {
    return this.service.booking(data);
  }

  @Post('cancel')
  @ApiResponse({
    status: 200,
    description: 'The user action started.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBearerAuth()
  @ResponseMessage('Booking')
  cancel(@Body() data: CancelBookingDto) {
    return this.service.bookingCancel(data);
  }
}
