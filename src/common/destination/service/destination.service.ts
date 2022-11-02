import { DestinationModel } from '@app/common/destination/model/destination.model';
import { ServerModel } from '@app/common/server/model/server.model';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { DestinationType } from '@prisma/client';

@Injectable()
export class DestinationService {
  constructor(private readonly prisma: PrismaService) {}

  async createDestinationFromNamespaceId(
    namespaceId: string,
  ): Promise<DestinationModel> {
    return this.prisma.destination.create({
      data: {
        type: DestinationType.NAMESPACE,
        namespace: {
          connect: {
            id: namespaceId,
          },
        },
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
