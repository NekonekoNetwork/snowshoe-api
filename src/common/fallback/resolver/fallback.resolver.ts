import { FallbackModel } from '@app/common/fallback/model/fallback.model';
import { NamespaceModel } from '@app/common/namespace/model/namespace.model';
import { NamespaceService } from '@app/common/namespace/service/namespace.service';
import { ServerModel } from '@app/common/server/model/server.model';
import { ServerService } from '@app/common/server/service/server.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => FallbackModel)
export class FallbackResolver {
  constructor(
    private readonly namespaceService: NamespaceService,
    private readonly serverService: ServerService,
  ) {}

  @ResolveField(() => NamespaceModel)
  async namespace(@Parent() fallback: FallbackModel): Promise<NamespaceModel> {
    return this.namespaceService.findNamespace(fallback.namespaceId);
  }

  @ResolveField(() => ServerModel, { nullable: true })
  async server(@Parent() fallback: FallbackModel): Promise<ServerModel | null> {
    if (!fallback.serverId) {
      return null;
    }

    return this.serverService.findServer(fallback.serverId);
  }
}
