import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { ServerWithNamespace } from './server.model';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) { }

  async findServers(): Promise<ServerWithNamespace[]> {
    return this.prisma.server.findMany({
      include: {
        namespace: true
      }
    });
  }
}
