import type { NamespaceModel } from '@app/namespace/namespace.model';
import { PrismaService } from '@app/prisma/prisma.service';
import type { ServerModel } from '@app/server/server.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FallbackService {
  constructor(private readonly prisma: PrismaService) {}

  async findNamespace(id: string): Promise<NamespaceModel> {
    const namespace = await this.prisma.fallback
      .findUnique({
        where: {
          id,
        },
        rejectOnNotFound: true,
      })
      .namespace();

    if (!namespace) {
      throw new Error(`Namespace in Fallback with id ${id} not found`);
    }

    return namespace;
  }

  async findServer(id: string): Promise<ServerModel> {
    const server = await this.prisma.fallback
      .findUnique({
        where: {
          id,
        },
        rejectOnNotFound: true,
      })
      .server();

    if (!server) {
      throw new Error(`Server in Fallback with id ${id} not found`);
    }

    return server;
  }

  async findNamespaces(id: string): Promise<NamespaceModel[]> {
    return this.prisma.fallback.findUnique({ where: { id } }).namespaces();
  }

  async findServers(id: string): Promise<ServerModel[]> {
    return this.prisma.fallback.findUnique({ where: { id } }).servers();
  }
}
