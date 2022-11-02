import { DestinationService } from '@app/common/destination/service/destination.service';
import { CreateServerInput } from '@app/common/server/dto/create-server.input';
import { UpdateServerInput } from '@app/common/server/dto/update-server.input';
import { ServerModel } from '@app/common/server/model/server.model';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ServerService {
  private readonly logger = new Logger(ServerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly destinationService: DestinationService,
  ) {}

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
    const server = await this.prisma.server.create({
      data: {
        ...payload,
      },
    });

    try {
      await this.destinationService.createDestinationFromServer(server);
    } catch (err) {
      this.logger.error(err);
    }

    return server;
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
