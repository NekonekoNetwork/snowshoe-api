import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateVirtualHostDto } from './virtual-host.dto';
import type { VirtualHost } from './virtual-host.model';

@Injectable()
export class VirtualHostService {
  constructor(private readonly prisma: PrismaService) { }

  async getVirtualHosts(): Promise<VirtualHost[]> {
    return this.prisma.virtualHost.findMany();
  }

  async createVirtualHost(payload: CreateVirtualHostDto): Promise<VirtualHost> {
    console.log(payload)
    return Promise.reject('Not implemented');
  }
}
