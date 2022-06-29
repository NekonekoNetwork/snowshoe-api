import { AppModule } from '@app/app.module';
import { PrismaService } from '@app/prisma/prisma.service';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(4000);
}
bootstrap();
