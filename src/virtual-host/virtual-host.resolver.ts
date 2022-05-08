import { NamespaceModel } from '@app/namespace/namespace.model';
import { NamespaceService } from '@app/namespace/namespace.service';
import { ServerModel } from '@app/server/server.model';
import { ServerService } from '@app/server/server.service';
import {
  CreateVirtualHostInput,
  UpdateVirtualHostInput,
} from '@app/virtual-host/virtual-host.dto';
import { VirtualHostModel } from '@app/virtual-host/virtual-host.model';
import { VirtualHostService } from '@app/virtual-host/virtual-host.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(() => VirtualHostModel)
export class VirtualHostResolver {
  constructor(
    private readonly virtualHostService: VirtualHostService,
    private readonly namespaceService: NamespaceService,
    private readonly serverService: ServerService,
  ) {}

  @Query(() => [VirtualHostModel])
  async virtualHosts(): Promise<VirtualHostModel[]> {
    return this.virtualHostService.findVirtualHosts();
  }

  @Mutation(() => VirtualHostModel)
  async createVirtualHost(
    @Args('payload') payload: CreateVirtualHostInput,
  ): Promise<VirtualHostModel> {
    return this.virtualHostService.createVirtualHost(payload);
  }

  @Mutation(() => VirtualHostModel)
  async updateVirtualHost(
    @Args('id') id: string,
    @Args('payload') payload: UpdateVirtualHostInput,
  ): Promise<VirtualHostModel> {
    return this.virtualHostService.updateVirtualHost(id, payload);
  }

  @ResolveField(() => NamespaceModel)
  async namespace(
    @Parent() virtualHost: VirtualHostModel,
  ): Promise<NamespaceModel> {
    return this.namespaceService.findNamespace(virtualHost.namespaceId);
  }

  @ResolveField(() => ServerModel, { nullable: true })
  async server(
    @Parent() virtualHost: VirtualHostModel,
  ): Promise<ServerModel | null> {
    if (!virtualHost.serverId) {
      return null;
    }

    return this.serverService.findServer(virtualHost.serverId);
  }
}
