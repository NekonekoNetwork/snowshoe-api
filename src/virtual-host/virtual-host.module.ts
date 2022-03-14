import { Module } from '@nestjs/common';
import { VirtualHostResolver } from './virtual-host.resolver';
import { VirtualHostService } from './virtual-host.service';

@Module({
  providers: [VirtualHostResolver, VirtualHostService],
  exports: [VirtualHostService],
})
export class VirtualHostModule { }
