import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Configuração do Swagger, para documentação da API
  const config = new DocumentBuilder()
    .setTitle('MEI-2-ME')
    .setDescription('Documentação da API da aplicação MEI-2-ME.')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/document', app, document);

  // Configuração de validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração de CORS melhorada
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_LOCAL_URL,
  ].filter((origin) => origin); // Remove valores falsy (undefined, '', etc.)

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Prefixo global para API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Application running on port ${port}`);
  logger.log(`Allowed CORS origins: ${allowedOrigins.join(', ') || '*'}`);
}

bootstrap().catch((err) => {
  console.error('Erro ao iniciar a aplicação:', err);
  process.exit(1);
});
