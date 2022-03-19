import { Injectable } from '@nestjs/common';
import type { Namespace } from 'src/prisma/generated';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NamespaceService {
  constructor(private readonly prisma: PrismaService) { }

  async findNamespaces(): Promise<Namespace[]> {
    return this.prisma.namespace.findMany();
  }
}
