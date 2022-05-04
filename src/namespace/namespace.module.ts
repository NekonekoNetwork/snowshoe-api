import { NamespaceResolver } from '@app/namespace/namespace.resolver';
import { NamespaceService } from '@app/namespace/namespace.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [NamespaceService, NamespaceResolver],
  exports: [NamespaceService],
})
export class NamespaceModule {}
