import { DestinationModel } from '@app/common/destination/model/destination.model';
import { CreateVirtualHostInput } from '@app/common/virtual-host/dto/create-virtual-host.input';
import type { UpdateVirtualHostInput } from '@app/common/virtual-host/dto/update-virtual-host.input';
import { VirtualHostModel } from '@app/common/virtual-host/model/virtual-host.model';
import { VirtualHostService } from '@app/common/virtual-host/service/virtual-host.service';
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
  constructor(private readonly virtualHostService: VirtualHostService) {}

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

  @Mutation(() => VirtualHostModel)
  async deleteVirtualHost(@Args('id') id: string): Promise<VirtualHostModel> {
    return this.virtualHostService.deleteVirtualHost(id);
  }

  @ResolveField(() => [DestinationModel])
  async namespace(
    @Parent() virtualHost: VirtualHostModel,
  ): Promise<DestinationModel[]> {
    return this.virtualHostService.findDestinations(virtualHost.id);
  }
}
