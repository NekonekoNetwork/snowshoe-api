import { DestinationModel } from '@app/common/destination/model/destination.model';
import { CreateVirtualHostInput } from '@app/common/virtual-host/dto/create-virtual-host.input';
import { UpdateVirtualHostInput } from '@app/common/virtual-host/dto/update-virtual-host.input';
import { VirtualHostModel } from '@app/common/virtual-host/model/virtual-host.model';

import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { DestinationType, Prisma } from '@prisma/client';

@Injectable()
export class VirtualHostService {
  constructor(private readonly prisma: PrismaService) {}

  async findVirtualHosts(): Promise<VirtualHostModel[]> {
    return this.prisma.virtualHost.findMany();
  }

  async createVirtualHost(
    payload: CreateVirtualHostInput,
  ): Promise<VirtualHostModel> {
    const destinations: Prisma.DestinationCreateWithoutVirtualHostsInput[] =
      payload.destinations.map((dest) => {
        if (dest.type === DestinationType.SERVER && dest.serverId === null) {
          throw new Error('serverId is required for server destinations');
        }

        return {
          type: dest.type,
          namespace: {
            connect: {
              id: dest.namespaceId,
            },
          },
          ...(dest.serverId && {
            server: {
              connect: {
                id: dest.serverId,
              },
            },
          }),
        };
      });

    return this.prisma.virtualHost.create({
      data: {
        name: payload.name,
        destinations: {
          create: destinations,
        },
      },
    });
  }

  async updateVirtualHost(id: string, payload: UpdateVirtualHostInput) {
    return this.prisma.virtualHost.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteVirtualHost(id: string) {
    return this.prisma.virtualHost.delete({
      where: {
        id,
      },
    });
  }

  async findDestinations(id: string): Promise<DestinationModel[]> {
    return this.prisma.virtualHost
      .findFirstOrThrow({
        where: {
          id,
        },
      })
      .destinations();
  }
}
