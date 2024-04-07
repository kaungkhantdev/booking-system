import { NestFactory } from '@nestjs/core';
import { SeedModule } from '@database/seed/seed.module';
import { SeedService } from '@database/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);

  const seeder = app.get(SeedService);
  await seeder.seed();

  console.log(
    'Successfully added require data and finished seeding data click < Ctrl + C >',
  );
}

bootstrap();
