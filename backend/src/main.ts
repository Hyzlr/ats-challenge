// lib
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';

// app module
import { AppModule } from './app/app.module';

// build utils
import setupSwagger from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // setting up swagger docs
  setupSwagger(app);

  // middleware
  await app.register(compression, { global: true });
  await app.register(fastifyHelmet, { global: true });

  await app.listen({ port: Number(process.env.PORT) });
}

bootstrap();
