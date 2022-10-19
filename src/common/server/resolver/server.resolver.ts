import { NamespaceModel } from '@app/common/namespace/model/namespace.model';
import { NamespaceService } from '@app/common/namespace/service/namespace.service';
import { ServerStatusModel } from '@app/common/server-status/model/server-status.model';
import { ServerStatusService } from '@app/common/server-status/service/server-status.service';
import { CreateServerInput } from '@app/common/server/dto/server.dto';
import { ServerModel } from '@app/common/server/model/server.model';
import { ServerService } from '@app/common/server/service/server.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(() => ServerModel)
export class ServerResolver {
  constructor(
    private readonly serverService: ServerService,
    private readonly namespaceService: NamespaceService,
    private readonly serverStatusService: ServerStatusService,
  ) {}

  @Query(() => [ServerModel])
  async servers(
    @Args('namespaceId', { nullable: true, type: () => String })
    namespaceId: string | null,
  ): Promise<ServerModel[]> {
    return this.serverService.findServers(namespaceId);
  }

  @Mutation(() => ServerModel)
  async createServer(
    @Args('payload') payload: CreateServerInput,
  ): Promise<ServerModel> {
    return this.serverService.createServer(payload);
  }

  @Mutation(() => ServerModel)
  async updateServer(
    @Args('id') id: string,
    payload: CreateServerInput,
  ): Promise<ServerModel> {
    return this.serverService.updateServer(id, payload);
  }

  @Mutation(() => ServerModel)
  async deleteServer(@Args('id') id: string): Promise<ServerModel> {
    return this.serverService.deleteServer(id);
  }

  @ResolveField(() => NamespaceModel)
  async namespace(@Parent() server: ServerModel): Promise<NamespaceModel> {
    return this.namespaceService.findNamespace(server.namespaceId);
  }

  @ResolveField(() => ServerStatusModel, { nullable: true })
  async serverStatus(
    @Parent() server: ServerModel,
  ): Promise<ServerStatusModel | null> {
    return this.serverStatusService.findServerStatus(server.id);
  }
}
