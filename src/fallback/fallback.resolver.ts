import { FallbackModel } from '@app/fallback/fallback.model';
import { FallbackService } from '@app/fallback/fallback.service';
import { NamespaceModel } from '@app/namespace/namespace.model';
import { ServerModel } from '@app/server/server.model';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => FallbackModel)
export class FallbackResolver {
  constructor(private readonly fallbackService: FallbackService) {}

  @ResolveField(() => NamespaceModel)
  async namespace(@Parent() fallback: FallbackModel): Promise<NamespaceModel> {
    return this.fallbackService.findNamespace(fallback.id);
  }

  @ResolveField(() => ServerModel)
  async server(@Parent() fallback: FallbackModel): Promise<ServerModel> {
    return this.fallbackService.findServer(fallback.id);
  }

  @ResolveField(() => [NamespaceModel])
  async namespaces(
    @Parent() fallback: FallbackModel,
  ): Promise<NamespaceModel[]> {
    return this.fallbackService.findNamespaces(fallback.id);
  }

  @ResolveField(() => [ServerModel])
  async servers(@Parent() fallback: FallbackModel): Promise<ServerModel[]> {
    return this.fallbackService.findServers(fallback.id);
  }
}
