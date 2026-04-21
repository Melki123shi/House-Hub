import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/filters/global-exception.filter';
import { logger } from './core/middlewares/logger-middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { SupabaseAuthGuard } from './auth/supabase-auth.guard';
import { AuthService } from './auth/auth.service';

const logStartupDatabaseTarget = (): void => {
  const rawDatabaseUrl = process.env.DATABASE_URL || process.env.DATABASE_URI;
  if (!rawDatabaseUrl) {
    console.warn('[Bootstrap] DATABASE_URL/DATABASE_URI is not set');
    return;
  }

  try {
    const parsed = new URL(rawDatabaseUrl);
    const host = parsed.hostname || 'unknown-host';
    const port = parsed.port || '5432';
    const databaseName = parsed.pathname?.replace('/', '') || 'postgres';
    console.log(
      `[Bootstrap] Database target ${host}:${port}/${databaseName}`,
    );
  } catch {
    console.log('[Bootstrap] Database target loaded from environment');
  }
};

async function bootstrap() {
  logStartupDatabaseTarget();
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  const options = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const appDocumentFactory = () =>
    SwaggerModule.createDocument(app, options, {
      include: [AuthModule],
    });
  SwaggerModule.setup('api', app, appDocumentFactory);

  app.use(logger); // Apply logger middleware to all routes. for functional middleware.

  app.useGlobalPipes(
    new ValidationPipe({
      // Keep only fields that are declared in DTO classes.
      whitelist: true,
      // Reject unexpected extra fields instead of silently accepting them.
      forbidNonWhitelisted: true,
      // Allow Nest to transform payloads to the DTO class shape.
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
/**
 * bootstrap meaning: a technique of loading a program into a computer by means of a
 * few initial instructions which enable the introduction of the rest of the program from an input device.
 */
bootstrap();
