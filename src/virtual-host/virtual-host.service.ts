import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateVirtualHostInput } from './virtual-host.dto';
import type { VirtualHostWithNamespaceAndServer } from './virtual-host.model';

@Injectable()
export class VirtualHostService {
  constructor(private readonly prisma: PrismaService) { }

  async getVirtualHosts(): Promise<VirtualHostWithNamespaceAndServer[]> {
    return this.prisma.virtualHost.findMany({
      include: {
        namespace: true,
        server: {
          include: {
            namespace: true,
          }
        }
      }
    });
  }

  async createVirtualHost(payload: CreateVirtualHostInput): Promise<VirtualHostWithNamespaceAndServer> {
    return this.prisma.virtualHost.create({
      data: {
        name: payload.name,
        type: payload.type,
        namespace: {
          connect: {
            id: payload.namespaceId
          }
        },
        server: payload.serverId ? {
          connect: {
            id: payload.serverId
          }
        } : undefined
      },
      include: {
        namespace: true,
        server: {
          include: {
            namespace: true,
          }
        }
      }
    })
  }
}
