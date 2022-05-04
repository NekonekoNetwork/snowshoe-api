import type { NamespaceModel } from '@app/namespace/namespace.model';
import type { PrismaService } from '@app/prisma/prisma.service';
import type { ServerModel } from '@app/server/server.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async findServers(): Promise<ServerModel[]> {
    return this.prisma.server.findMany();
  }

  async findNamespace(id: string): Promise<NamespaceModel> {
    const namespace = await this.prisma.server
      .findUnique({
        where: {
          id,
        },
      })
      .namespace();

    if (!namespace) {
      throw new Error(`Could not find namespace with id ${id}`);
    }

    return namespace;
  }
}
