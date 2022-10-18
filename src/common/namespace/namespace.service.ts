import type { FallbackModel } from '@app/common/fallback/fallback.model';
import type {
  CreateNamespaceInput,
  UpdateNamespaceInput,
} from '@app/common/namespace/namespace.dto';
import type { NamespaceModel } from '@app/common/namespace/namespace.model';
import type { ServerModel } from '@app/common/server/server.model';
import type { VirtualHostModel } from '@app/common/virtual-host/virtual-host.model';
import { PrismaService } from '@app/prisma/prisma.service';
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
        name: payload.name,
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
        name: payload.name,
        fallback: {
          connectOrCreate: {
            where: {
              namespaceId: payload.fallback?.namespaceId,
              serverId: payload.fallback?.serverId,
            },
            create: {
              namespaces: {
                connect: {
                  id: payload.fallback?.namespaceId,
                },
              },
              serverId: payload.fallback?.serverId,
            },
          },
        },
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
    return this.prisma.namespace.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findFallback(id: string): Promise<FallbackModel | null> {
    return this.prisma.namespace.findUnique({ where: { id } }).fallback();
  }

  async findServers(id: string): Promise<ServerModel[]> {
    return this.prisma.namespace
      .findUnique({
        where: {
          id,
        },
        rejectOnNotFound: true,
      })
      .servers();
  }

  async findFallbacks(id: string): Promise<FallbackModel[]> {
    return this.prisma.namespace
      .findUnique({
        where: {
          id,
        },
        rejectOnNotFound: true,
      })
      .fallbacks();
  }

  async findVirtualHosts(id: string): Promise<VirtualHostModel[]> {
    return this.prisma.namespace
      .findUnique({
        where: {
          id,
        },
        rejectOnNotFound: true,
      })
      .virtualHosts();
  }
}
