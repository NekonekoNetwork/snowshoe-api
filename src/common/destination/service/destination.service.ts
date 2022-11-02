import { DestinationModel } from '@app/common/destination/model/destination.model';
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

  async createDestinationFromServer(input: {
    namespaceId: string;
    serverId: string;
  }): Promise<DestinationModel> {
    return this.prisma.destination.create({
      data: {
        type: DestinationType.SERVER,
        namespace: {
          connect: {
            id: input.namespaceId,
          },
        },
        server: {
          connect: {
            id: input.serverId,
          },
        },
      },
    });
  }
}
