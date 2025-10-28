import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes properties not in DTO
      forbidNonWhitelisted: true, // throws error if extra properties sent
      transform: true, // automatically converts plain object to DTO class instance
      forbidUnknownValues: true,
      skipMissingProperties: true,
      exceptionFactory: (errors) => {
        const formattedErrors = {};

        errors.forEach((err) => {
          formattedErrors[err.property] = Object.values(err.constraints || {});
        });

        return new BadRequestException({
          status: 'error',
          code: 400,
          errors: formattedErrors,
        });
      },
    }),
  );

  await app.listen(process.env.BACKEND_PORT ?? 8080);
}
bootstrap()
  .then(() => {
    console.log(
      `Application is running on: ${process.env.BACKEND_PORT ?? 8080}`,
    );
  })
  .catch(() => {
    console.error('Application failed to start');
  });
