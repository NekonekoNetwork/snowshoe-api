import { ServerResolver } from '@app/server/server.resolver';
import { ServerService } from '@app/server/server.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [ServerService, ServerResolver],
  exports: [ServerService],
})
export class ServerModule {}
