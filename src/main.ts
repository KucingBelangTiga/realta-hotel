import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3002;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port, () =>
    console.log('Server is listening on port ' + port),
  );
}
bootstrap();
