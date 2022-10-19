import { NamespaceResolver } from '@app/common/namespace/resolver/namespace.resolver';
import { NamespaceService } from '@app/common/namespace/service/namespace.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [NamespaceService, NamespaceResolver],
  exports: [NamespaceService],
})
export class NamespaceModule {}
