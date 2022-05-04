import type {
  CreateNamespaceInput,
  UpdateNamespaceInput,
} from '@app/namespace/namespace.dto';
import type { NamespaceModel } from '@app/namespace/namespace.model';
import type { PrismaService } from '@app/prisma/prisma.service';
import type { ServerModel } from '@app/server/server.model';
import type { VirtualHostModel } from '@app/virtual-host/virtual-host.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NamespaceService {
  constructor(private readonly prisma: PrismaService) {}

  async findNamespaces(): Promise<NamespaceModel[]> {
    return this.prisma.namespace.findMany();
  }

  async createNamespace(
    payload: CreateNamespaceInput,
  ): Promise<NamespaceModel> {
    return this.prisma.namespace.create({
      data: {
        ...payload,
      },
    });
  }

  async updateNamespace(
    id: string,
    payload: UpdateNamespaceInput,
  ): Promise<NamespaceModel> {
    return this.prisma.namespace.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteNamespace(id: string): Promise<NamespaceModel> {
    return this.prisma.namespace.delete({
      where: {
        id,
      },
    });
  }

  async findNamespace(id: string): Promise<NamespaceModel> {
    const namespace = await this.prisma.namespace.findUnique({
      where: {
        id,
      },
    });

    if (!namespace) {
      throw new Error(`Namespace with id '${id}' not found`);
    }

    return namespace;
  }

  async findServers(id: string): Promise<ServerModel[]> {
    return this.prisma.namespace
      .findUnique({
        where: {
          id,
        },
      })
      .servers();
  }

  async findVirtualHosts(id: string): Promise<VirtualHostModel[]> {
    return this.prisma.namespace
      .findUnique({
        where: {
          id,
        },
      })
      .virtualHosts();
  }
}
