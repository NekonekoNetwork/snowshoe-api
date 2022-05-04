import { NamespaceModel } from '@app/namespace/namespace.model';
import { ServerModel } from '@app/server/server.model';
import type { ServerService } from '@app/server/server.service';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => ServerModel)
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => [ServerModel])
  async servers(): Promise<ServerModel[]> {
    return this.serverService.findServers();
  }

  @ResolveField(() => NamespaceModel)
  async namespace(@Parent() server: ServerModel): Promise<NamespaceModel> {
    return this.serverService.findNamespace(server.id);
  }
}
