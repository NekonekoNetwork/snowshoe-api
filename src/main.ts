import { AppModule } from '@app/app.module';
import { PrismaClientExceptionFilter } from '@app/prisma/prisma-client-exception.filter';
import { PrismaService } from '@app/prisma/prisma.service';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(4000);
}
bootstrap();
