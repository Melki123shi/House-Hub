import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(process.env.PORT ?? 3000);
}
/**
 * bootstrap meaning: a technique of loading a program into a computer by means of a
 * few initial instructions which enable the introduction of the rest of the program from an input device.
 */
bootstrap();
