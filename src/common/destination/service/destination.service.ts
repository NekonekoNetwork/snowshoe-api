import { DestinationModel } from '@app/common/destination/model/destination.model';
import { NamespaceModel } from '@app/common/namespace/model/namespace.model';
import { ServerModel } from '@app/common/server/model/server.model';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { DestinationType } from '@prisma/client';

@Injectable()
export class DestinationService {
  constructor(private readonly prisma: PrismaService) {}

  async createDestinationFromNamespace(
    namespace: NamespaceModel,
  ): Promise<DestinationModel> {
    return this.prisma.destination.create({
      data: {
        type: DestinationType.NAMESPACE,
        namespaceId: namespace.id,
      },
    });
  }

  async createDestinationFromServer(
    server: ServerModel,
  ): Promise<DestinationModel> {
    return this.prisma.destination.create({
      data: {
        type: DestinationType.SERVER,
        namespaceId: server.namespaceId,
        serverId: server.id,
      },
    });
  }
}
