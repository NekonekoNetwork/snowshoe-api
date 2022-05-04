import { ServerResolver } from '@app/server/server.resolver';
import { ServerService } from '@app/server/server.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ServerService, ServerResolver],
  exports: [ServerService],
})
export class ServerModule {}
