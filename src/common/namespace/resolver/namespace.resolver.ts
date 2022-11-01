import { FallbackModel } from '@app/common/fallback/model/fallback.model';
import { FallbackService } from '@app/common/fallback/service/fallback.service';
import { CreateNamespaceInput } from '@app/common/namespace/dto/create-namespace.input';
import { UpdateNamespaceInput } from '@app/common/namespace/dto/updaet-namespace.input';

import { NamespaceModel } from '@app/common/namespace/model/namespace.model';

import { NamespaceService } from '@app/common/namespace/service/namespace.service';
import { ServerModel } from '@app/common/server/model/server.model';
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
}
