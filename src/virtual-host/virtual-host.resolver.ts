import { CreateVirtualHostInput } from '@app/virtual-host/virtual-host.dto';
import { VirtualHostModel } from '@app/virtual-host/virtual-host.model';
import { VirtualHostService } from '@app/virtual-host/virtual-host.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => VirtualHostModel)
export class VirtualHostResolver {
  constructor(private readonly service: VirtualHostService) {}

  @Query(() => [VirtualHostModel])
  async virtualHosts(): Promise<VirtualHostModel[]> {
    return this.service.getVirtualHosts();
  }

  @Mutation(() => VirtualHostModel)
  async createVirtualHost(
    @Args('payload') payload: CreateVirtualHostInput,
  ): Promise<VirtualHostModel> {
    return this.service.createVirtualHost(payload);
  }
}
