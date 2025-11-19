import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Raíces de Córdoba')
    .setDescription('Documentación de la API del proyecto')
    .setVersion('1.0')
    // .addBearerAuth() // Si agregas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger en /api

  await app.listen(3000);
  console.log('Servidor corriendo en el puerto 3000');
}
bootstrap();
