import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import fastifyMutipart from 'fastify-multipart'
import { join } from 'path/posix'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.setGlobalPrefix('/api/v1')
  // app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets({
    root:  join(__dirname, '../../../..', 'ardor-file'),
    prefix: '/ardor-file/',
  }
  )
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '../../../..', 'ardor-file'),
  });
  app.register(fastifyMutipart, {
		addToBody: true
	})
  await app.listen(3000);
}
bootstrap();