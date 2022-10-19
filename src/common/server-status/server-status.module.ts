import { ServerStatusResolver } from '@app/common/server-status/resolver/server-status.resolver';
import { ServerStatusService } from '@app/common/server-status/service/server-status.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [ServerStatusService, ServerStatusResolver],
  exports: [ServerStatusService],
})
export class ServerStatusModule {}
