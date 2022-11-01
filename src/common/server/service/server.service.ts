import { CreateServerInput } from '@app/common/server/dto/create-server.input';
import { UpdateServerInput } from '@app/common/server/dto/update-server.input';
import { ServerModel } from '@app/common/server/model/server.model';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async findServers(namespaceId: string | null): Promise<ServerModel[]> {
    return this.prisma.server.findMany({
      where: {
        namespaceId: namespaceId ?? undefined,
      },
    });
  }

  async findServersFromNamespace(namespaceId: string): Promise<ServerModel[]> {
    return this.prisma.server.findMany({
      where: {
        namespaceId,
      },
    });
  }

  async findServer(id: string): Promise<ServerModel> {
    return this.prisma.server.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });
  }

  async createServer(payload: CreateServerInput): Promise<ServerModel> {
    return this.prisma.server.create({
      data: {
        ...payload,
      },
    });
  }

  async updateServer(
    id: string,
    payload: UpdateServerInput,
  ): Promise<ServerModel> {
    return this.prisma.server.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteServer(id: string): Promise<ServerModel> {
    return this.prisma.server.delete({
      where: {
        id,
      },
    });
  }
}
