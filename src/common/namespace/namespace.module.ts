import { NamespaceResolver } from '@app/common/namespace/namespace.resolver';
import { NamespaceService } from '@app/common/namespace/namespace.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [NamespaceService, NamespaceResolver],
  exports: [NamespaceService],
})
export class NamespaceModule {}
