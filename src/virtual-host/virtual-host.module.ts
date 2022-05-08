import { VirtualHostResolver } from '@app/virtual-host/virtual-host.resolver';
import { VirtualHostService } from '@app/virtual-host/virtual-host.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [VirtualHostResolver, VirtualHostService],
  exports: [VirtualHostService],
})
export class VirtualHostModule {}
