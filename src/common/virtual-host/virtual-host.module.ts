import { VirtualHostResolver } from '@app/common/virtual-host/resolver/virtual-host.resolver';
import { VirtualHostService } from '@app/common/virtual-host/service/virtual-host.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [VirtualHostResolver, VirtualHostService],
  exports: [VirtualHostService],
})
export class VirtualHostModule {}
