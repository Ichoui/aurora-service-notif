import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

const server: express.Express = express();

async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressInstance), {});
  await app.listen(1994);
  app.enableCors();
  app.disable('x-powered-by');
  app.disable('X-Powered-By');

  return app.init();
}

createNestServer(server).then(() => console.log('Server is Running'));
