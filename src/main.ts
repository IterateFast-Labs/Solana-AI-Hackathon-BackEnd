import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { I18nInterceptor } from './commons/interceptors/i18n.interceptor';

function getCORSOrigins() {
  switch (process.env.ENV) {
    case 'local':
    case 'dev': {
      return [];
    }

    default: {
      return [];
    }
  }
}

function loadAPIDocumentSettings(app: INestApplication) {
  if (process.env.ENV === 'local' || process.env.ENV === 'dev') {
    const config = new DocumentBuilder()
      .setTitle(`Fission Mini App Server API Docs`)
      .setDescription(``)
      .setVersion('0.1')
      .setExternalDoc('Find more info here', 'https://swagger.io')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          name: 'JWT',
          in: 'header',
        },
        'accessToken',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NEST');

  // CORS
  app.enableCors({
    origin: getCORSOrigins().length === 0 ? '*' : getCORSOrigins(),
  });

  // class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // swagger
  loadAPIDocumentSettings(app);

  //app.useGlobalInterceptors(new I18nInterceptor());

  const exportPort = process.env.PORT || 3000;
  await app.listen(exportPort, () => {
    logger.log(`Server is running on: http://localhost:${exportPort}`);
  });
}
bootstrap();
