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
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const serveStatic = require('serve-static')

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.setGlobalPrefix('/api/v1')
  // app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.use('/ardor-file', serveStatic(join(__dirname, '..', 'ardor-file')))
  // app.useStaticAssets({
  //   root:  join(__dirname, '..', 'ardor-file'),
  //   prefix: '/ardor-file/',
  // })
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '../../../..', 'ardor-file'),
  });
  
  const options = new DocumentBuilder()
    .setTitle('ardor Api')
    .setDescription('ardor Api')
    .setVersion('1.0')
    .addTag('/api/v1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.register(fastifyMutipart, {
		addToBody: true
	})
  await app.listen(8070, '0.0.0.0');
}
bootstrap();
