import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVirtualHostDto } from './virtual-host.dto';
import { VirtualHost } from './virtual-host.model';
import { VirtualHostService } from './virtual-host.service';

@Resolver(() => VirtualHost)
export class VirtualHostResolver {
  constructor(private readonly service: VirtualHostService) { }

  @Query(() => VirtualHost)
  async virtualHosts(): Promise<VirtualHost[]> {
    return this.service.getVirtualHosts();
  }

  @Mutation(() => VirtualHost)
  async createVirtualHost(@Args('payload') payload: CreateVirtualHostDto): Promise<VirtualHost> {
    return this.service.createVirtualHost(payload);
  }
}
