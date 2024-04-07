import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@database/typeorm';
import { UserModule } from '@api/v1/user/user.module';
import { CountryModule } from '@api/v1/country/country.module';
import { MailModule } from './mail/mail.module';
import { APP_INTERCEPTOR, APP_PIPE, RouterModule } from '@nestjs/core';
import { AuthModule } from '@api/v1/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { BaseResponseInterceptor } from './intercetpers/base.response';
import { PackageModule } from '@api/v1/package/package.module';
import { PurchaseModule } from '@api/v1/purchase/purchase.module';
import { CheckToken } from '@middleware/check-token.middleware';
import { PurchaseController } from '@api/v1/purchase/purchase.controller';
import { PackageController } from '@api/v1/package/package.controller';
import { ClassModule } from '@api/v1/class/class.module';
import { ClassController } from '@api/v1/class/class.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { BookingModule } from '@api/v1/booking/booking.module';
import { BookingLogModule } from '@api/v1/booking-log/booking-log.module';
import { BookingController } from '@api/v1/booking/booking.controller';
import { UserController } from '@api/v1/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_URL ?? 'localhost',
            port: Number(process.env.REDIS_PORT) ?? 6379,
          },
        }),
      }),
    }),
    UserModule,
    MailModule,
    AuthModule,
    PackageModule,
    CountryModule,
    PurchaseModule,
    ClassModule,
    BookingModule,
    BookingLogModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'package',
            module: PackageModule,
          },
          {
            path: 'country',
            module: CountryModule,
          },
          {
            path: 'purchase',
            module: PurchaseModule,
          },
          {
            path: 'class',
            module: ClassModule,
          },
          {
            path: 'booking',
            module: BookingModule,
          },
          {
            path: 'user',
            module: UserModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckToken)
      .forRoutes(
        PurchaseController,
        PackageController,
        ClassController,
        BookingController,
        UserController,
      );
  }
}
