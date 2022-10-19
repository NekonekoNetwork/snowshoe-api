import type { FallbackModel } from '@app/common/fallback/model/fallback.model';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FallbackService {
  constructor(private readonly prisma: PrismaService) {}

  async findFromNamespace(namespaceId: string): Promise<FallbackModel | null> {
    return this.prisma.fallback.findUnique({
      where: {
        namespaceId,
      },
    });
  }
}
