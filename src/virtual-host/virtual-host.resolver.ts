import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVirtualHostInput } from './virtual-host.dto';
import { VirtualHostModel } from './virtual-host.model';
import { VirtualHostService } from './virtual-host.service';

@Resolver(() => VirtualHostModel)
export class VirtualHostResolver {
  constructor(private readonly service: VirtualHostService) { }

  @Query(() => [VirtualHostModel])
  async virtualHosts(): Promise<VirtualHostModel[]> {
    return this.service.getVirtualHosts();
  }

  @Mutation(() => VirtualHostModel)
  async createVirtualHost(@Args('payload') payload: CreateVirtualHostInput): Promise<VirtualHostModel> {
    return this.service.createVirtualHost(payload);
  }
}
