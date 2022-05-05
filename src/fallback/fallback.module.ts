import { FallbackResolver } from '@app/fallback/fallback.resolver';
import { FallbackService } from '@app/fallback/fallback.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FallbackService, FallbackResolver],
  exports: [FallbackService],
})
export class FallbackModule {}
