import type { UpdateServerStatusInput } from '@app/common/server-status/server-status.dto';
import type {
  SampleModModel,
  SamplePlayerModel,
  ServerStatusModel,
} from '@app/common/server-status/server-status.model';
import { PrismaService } from '@app/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async findServerStatus(serverId: string): Promise<ServerStatusModel | null> {
    const serverStatus = await this.prisma.serverStatus.findUnique({
      where: { serverId },
    });

    // 更新から30秒以上経過している場合はオフライン扱い
    if (serverStatus && serverStatus.updatedAt.getTime() + 30000 < Date.now()) {
      return null;
    }

    return serverStatus;
  }

  async updateServerStatus(
    serverId: string,
    input: UpdateServerStatusInput,
  ): Promise<ServerStatusModel> {
    const serverStatusId =
      (
        await this.prisma.serverStatus.findUnique({
          where: { serverId },
          select: { id: true },
        })
      )?.id ?? undefined;

    return this.prisma.serverStatus.upsert({
      where: { serverId },
      update: {
        ...input,
        players: {
          deleteMany: serverStatusId ? { serverStatusId } : undefined,
          create: input.players?.map((player) => ({ ...player })),
        },
        modInfos: {
          deleteMany: serverStatusId ? { serverStatusId } : undefined,
          create: input.modInfo?.map((modInfo) => ({ ...modInfo })),
        },
      },
      create: {
        ...input,
        serverId,
        players: {
          create: input.players?.map((player) => ({ ...player })),
        },
        modInfos: {
          create: input.modInfo?.map((modInfo) => ({ ...modInfo })),
        },
      },
    });
  }

  async players(serverStatusId: string): Promise<SamplePlayerModel[]> {
    return this.prisma.samplePlayer.findMany({
      where: { serverStatusId },
    });
  }

  async modInfos(serverStatusId: string): Promise<SampleModModel[]> {
    return this.prisma.sampleMod.findMany({
      where: { serverStatusId },
    });
  }
}
