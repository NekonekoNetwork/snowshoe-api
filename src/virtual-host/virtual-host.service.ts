import { PrismaService } from '@app/prisma/prisma.service';
import type {
  CreateVirtualHostInput,
  UpdateVirtualHostInput,
} from '@app/virtual-host/virtual-host.dto';
import type { VirtualHostModel } from '@app/virtual-host/virtual-host.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VirtualHostService {
  constructor(private readonly prisma: PrismaService) {}

  async findVirtualHosts(): Promise<VirtualHostModel[]> {
    return this.prisma.virtualHost.findMany();
  }

  async createVirtualHost(
    payload: CreateVirtualHostInput,
  ): Promise<VirtualHostModel> {
    return this.prisma.virtualHost.create({
      data: {
        name: payload.name,
        type: payload.type,
        namespace: {
          connect: {
            id: payload.namespaceId,
          },
        },
        server: payload.serverId
          ? {
              connect: {
                id: payload.serverId,
              },
            }
          : undefined,
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
}
