import type {
  CreateNamespaceInput,
  UpdateNamespaceInput,
} from '@app/namespace/namespace.dto';
import { NamespaceModel } from '@app/namespace/namespace.model';
import type { NamespaceService } from '@app/namespace/namespace.service';
import { ServerModel } from '@app/server/server.model';
import { VirtualHostModel } from '@app/virtual-host/virtual-host.model';
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
  constructor(private readonly namespaceService: NamespaceService) {}

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
    payload: UpdateNamespaceInput,
  ): Promise<NamespaceModel> {
    return this.namespaceService.updateNamespace(id, payload);
  }

  @Mutation(() => NamespaceModel)
  async deleteNamespace(@Args('id') id: string): Promise<NamespaceModel> {
    return this.namespaceService.deleteNamespace(id);
  }

  @ResolveField(() => [ServerModel])
  async servers(@Parent() namespace: NamespaceModel): Promise<ServerModel[]> {
    return this.namespaceService.findServers(namespace.id);
  }

  @ResolveField(() => [VirtualHostModel])
  async virtualHosts(
    @Parent() namespace: NamespaceModel,
  ): Promise<VirtualHostModel[]> {
    return this.namespaceService.findVirtualHosts(namespace.id);
  }
}
