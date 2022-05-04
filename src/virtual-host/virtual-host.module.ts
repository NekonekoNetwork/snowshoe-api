import { VirtualHostResolver } from '@app/virtual-host/virtual-host.resolver';
import { VirtualHostService } from '@app/virtual-host/virtual-host.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [VirtualHostResolver, VirtualHostService],
  exports: [VirtualHostService],
})
export class VirtualHostModule {}
