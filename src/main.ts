import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationConfig } from './config/validation.config';
import { ValidatorModule } from './validators/validator.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('codebase')
    .setDescription('The codebase API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get<string>('apiPrefix'));
  
  const port = configService.get<number>('port');

  await app.listen(port);
}
bootstrap();
