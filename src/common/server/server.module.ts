import { ServerResolver } from '@app/common/server/resolver/server.resolver';
import { ServerService } from '@app/common/server/service/server.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [ServerService, ServerResolver],
  exports: [ServerService],
})
export class ServerModule {}
