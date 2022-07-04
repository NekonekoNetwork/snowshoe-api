import { UpdateServerStatusInput } from '@app/server-status/server-status.dto';
import {
  SampleModModel,
  SamplePlayerModel,
  ServerStatusModel,
} from '@app/server-status/server-status.model';
import { ServerStatusService } from '@app/server-status/server-status.service';

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(ServerStatusModel)
export class ServerStatusResolver {
  constructor(private readonly serverStatusService: ServerStatusService) {}

  @Query(() => ServerStatusModel, { nullable: true })
  async serverStatus(
    @Args('serverId') serverId: string,
  ): Promise<ServerStatusModel | null> {
    return this.serverStatusService.findServerStatus(serverId);
  }

  @Mutation(() => ServerStatusModel)
  async updateServerStatus(
    @Args('serverId') serverId: string,
    @Args('data') data: UpdateServerStatusInput,
  ): Promise<ServerStatusModel> {
    return this.serverStatusService.updateServerStatus(serverId, data);
  }

  @ResolveField(() => [SamplePlayerModel])
  async players(
    @Parent() serverStatus: ServerStatusModel,
  ): Promise<SamplePlayerModel[]> {
    return this.serverStatusService.players(serverStatus.id);
  }

  @ResolveField(() => [SampleModModel])
  async modInfos(
    @Parent() serverStatus: ServerStatusModel,
  ): Promise<SampleModModel[]> {
    return this.serverStatusService.modInfos(serverStatus.id);
  }
}
