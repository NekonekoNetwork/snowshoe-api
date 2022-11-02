import { DestinationService } from '@app/common/destination/service/destination.service';
import { CreateNamespaceInput } from '@app/common/namespace/dto/create-namespace.input';
import { UpdateNamespaceInput } from '@app/common/namespace/dto/updaet-namespace.input';

import { NamespaceModel } from '@app/common/namespace/model/namespace.model';

import { ServerModel } from '@app/common/server/model/server.model';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { DestinationType } from '@prisma/client';

@Injectable()
export class NamespaceService {
  private readonly logger = new Logger(NamespaceService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly destinationService: DestinationService,
  ) {}

  async findNamespaces(): Promise<NamespaceModel[]> {
    return this.prisma.namespace.findMany();
  }

  async createNamespace(
    payload: CreateNamespaceInput,
  ): Promise<NamespaceModel> {
    const namespace = await this.prisma.namespace.create({
      data: {
        name: payload.name,
      },
    });

    try {
      await this.destinationService.createDestinationFromNamespaceId(
        namespace.id,
      );
    } catch (err) {
      this.logger.error(err);
    }

    return namespace;
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

  async findDestinationId(id: string): Promise<string> {
    const namespace = await this.prisma.namespace.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        destinations: {
          where: {
            type: DestinationType.NAMESPACE,
          },
          select: {
            id: true,
          },
        },
      },
    });

    const destination = namespace.destinations[0];
    if (destination) {
      return destination.id;
    }

    return this.destinationService
      .createDestinationFromNamespaceId(namespace.id)
      .then((dest) => dest.id);
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
}
