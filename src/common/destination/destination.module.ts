import { DestinationService } from '@app/common/destination/service/destination.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [DestinationService],
  exports: [DestinationService],
})
export class DestinationModule {}
