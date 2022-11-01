import { FallbackModel } from '@app/common/fallback/model/fallback.model';
import { CreateNamespaceInput } from '@app/common/namespace/dto/create-namespace.input';
import { UpdateNamespaceInput } from '@app/common/namespace/dto/updaet-namespace.input';

import { NamespaceModel } from '@app/common/namespace/model/namespace.model';

import { ServerModel } from '@app/common/server/model/server.model';
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
}
