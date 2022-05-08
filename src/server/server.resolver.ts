import { NamespaceModel } from '@app/namespace/namespace.model';
import { NamespaceService } from '@app/namespace/namespace.service';
import { CreateServerInput } from '@app/server/server.dto';
import { ServerModel } from '@app/server/server.model';
import { ServerService } from '@app/server/server.service';
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
  ) {}

  @Query(() => [ServerModel])
  async servers(): Promise<ServerModel[]> {
    return this.serverService.findServers();
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
}
