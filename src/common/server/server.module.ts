import { ServerResolver } from '@app/common/server/server.resolver';
import { ServerService } from '@app/common/server/server.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [ServerService, ServerResolver],
  exports: [ServerService],
})
export class ServerModule {}
