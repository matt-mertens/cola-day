import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');
  
  const config = new DocumentBuilder()
    .setTitle('Cola Day API')
    .setDescription('The Cola Day API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, ReservationsModule],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
