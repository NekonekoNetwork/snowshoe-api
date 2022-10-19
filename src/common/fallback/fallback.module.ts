import { FallbackResolver } from '@app/common/fallback/resolver/fallback.resolver';
import { FallbackService } from '@app/common/fallback/service/fallback.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [FallbackService, FallbackResolver],
  exports: [FallbackService],
})
export class FallbackModule {}
