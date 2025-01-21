// lib
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { prepareAndApplyTags } from './tags';

// package info
import { name, version } from '../../package.json';

const setupSwagger = (app: NestFastifyApplication): void => {
  const swaggerConfigInstance = new DocumentBuilder()
    .setTitle(`${name.toUpperCase()} - Documentation`)
    .setDescription(`Swagger documentation for ${name}`)
    .setVersion(version);

  const swaggerConfig = prepareAndApplyTags(swaggerConfigInstance).build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, documentFactory);
};

export default setupSwagger;
