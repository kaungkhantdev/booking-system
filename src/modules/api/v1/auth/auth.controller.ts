import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/sign-up.decorator';
import { ResponseMessage } from '@dtos/index.decorators';
import { LoginDto } from './dtos/sign-in.decorator';
import { OtpDto } from './dtos/otp.decorator';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ResponseMessage('Thanks you, your registration is success.')
  signUp(@Body() data: RegisterDto) {
    return this.authService.signUpService(data);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully Login.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ResponseMessage('Well done, sign in is success.')
  signIn(@Body() data: LoginDto) {
    return this.authService.signInService(data);
  }

  @Post('get-otp')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully got opt_code.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ResponseMessage('Otp send. Please check your email.')
  getOtpService(@Body() data: OtpDto) {
    return this.authService.getOtpService(data.email);
  }
}
