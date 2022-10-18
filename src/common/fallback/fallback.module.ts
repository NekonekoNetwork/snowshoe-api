import { FallbackResolver } from '@app/common/fallback/fallback.resolver';
import { FallbackService } from '@app/common/fallback/fallback.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [FallbackService, FallbackResolver],
  exports: [FallbackService],
})
export class FallbackModule {}
