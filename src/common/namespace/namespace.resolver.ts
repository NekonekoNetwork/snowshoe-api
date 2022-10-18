import { FallbackModel } from '@app/common/fallback/fallback.model';
import { FallbackService } from '@app/common/fallback/fallback.service';
import {
  CreateNamespaceInput,
  UpdateNamespaceInput,
} from '@app/common/namespace/namespace.dto';
import { NamespaceModel } from '@app/common/namespace/namespace.model';
import { NamespaceService } from '@app/common/namespace/namespace.service';
import { ServerModel } from '@app/common/server/server.model';
import { VirtualHostModel } from '@app/common/virtual-host/virtual-host.model';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(() => NamespaceModel)
export class NamespaceResolver {
  constructor(
    private readonly namespaceService: NamespaceService,
    private readonly fallbackService: FallbackService,
  ) {}

  @Query(() => [NamespaceModel])
  async namespaces(): Promise<NamespaceModel[]> {
    return this.namespaceService.findNamespaces();
  }

  @Query(() => NamespaceModel)
  async namespace(@Args('id') id: string): Promise<NamespaceModel> {
    return this.namespaceService.findNamespace(id);
  }

  @Mutation(() => NamespaceModel)
  async createNamespace(
    @Args('payload') payload: CreateNamespaceInput,
  ): Promise<NamespaceModel> {
    return this.namespaceService.createNamespace(payload);
  }

  @Mutation(() => NamespaceModel)
  async updateNamespace(
    @Args('id') id: string,
    @Args('payload') payload: UpdateNamespaceInput,
  ): Promise<NamespaceModel> {
    return this.namespaceService.updateNamespace(id, payload);
  }

  @Mutation(() => NamespaceModel)
  async deleteNamespace(@Args('id') id: string): Promise<NamespaceModel> {
    return this.namespaceService.deleteNamespace(id);
  }

  @ResolveField(() => FallbackModel, { nullable: true })
  async fallback(
    @Parent() namespace: NamespaceModel,
  ): Promise<FallbackModel | null> {
    return this.fallbackService.findFromNamespace(namespace.id);
  }

  @ResolveField(() => [ServerModel])
  async servers(@Parent() namespace: NamespaceModel): Promise<ServerModel[]> {
    return this.namespaceService.findServers(namespace.id);
  }

  @ResolveField(() => [FallbackModel])
  async fallbacks(
    @Parent() namespace: NamespaceModel,
  ): Promise<FallbackModel[]> {
    return this.namespaceService.findFallbacks(namespace.id);
  }

  @ResolveField(() => [VirtualHostModel])
  async virtualHosts(
    @Parent() namespace: NamespaceModel,
  ): Promise<VirtualHostModel[]> {
    return this.namespaceService.findVirtualHosts(namespace.id);
  }
}
