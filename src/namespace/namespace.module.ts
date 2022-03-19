import { Module } from '@nestjs/common';
import { NamespaceResolver } from './namespace.resolver';
import { NamespaceService } from './namespace.service';

@Module({
  providers: [NamespaceService, NamespaceResolver],
  exports: [NamespaceService]
})
export class NamespaceModule { }
