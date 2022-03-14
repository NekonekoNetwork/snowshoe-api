import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    PrismaModule,
})
export class AppModule {}
