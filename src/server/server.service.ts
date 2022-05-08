import type { NamespaceModel } from '@app/namespace/namespace.model';
import { PrismaService } from '@app/prisma/prisma.service';
import type { CreateServerInput } from '@app/server/server.dto';
import type { ServerModel } from '@app/server/server.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async findServers(): Promise<ServerModel[]> {
    return this.prisma.server.findMany();
  }

  async findServersFromNamespace(namespaceId: string): Promise<ServerModel[]> {
    return this.prisma.server.findMany({
      where: {
        namespaceId,
      },
    });
  }

  async findServer(id: string): Promise<ServerModel> {
    return this.prisma.server.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });
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

  async createServer(payload: CreateServerInput): Promise<ServerModel> {
    return this.prisma.server.create({
      data: {
        ...payload,
      },
    });
  }

  async updateServer(
    id: string,
    payload: CreateServerInput,
  ): Promise<ServerModel> {
    return this.prisma.server.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteServer(id: string): Promise<ServerModel> {
    return this.prisma.server.delete({
      where: {
        id,
      },
    });
  }
}
