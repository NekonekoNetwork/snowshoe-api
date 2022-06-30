import { Global, Module } from '@nestjs/common';
import { ServerStatusResolver } from './server-status.resolver';
import { ServerStatusService } from './server-status.service';

@Global()
@Module({
  providers: [ServerStatusService, ServerStatusResolver],
  exports: [ServerStatusService],
})
export class ServerStatusModule {}
