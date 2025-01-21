// lib
import { Module } from '@nestjs/common';

// services
import { CompressionService } from './compression.service';

@Module({
  providers: [CompressionService],
  exports: [CompressionService],
})
export class CompressionModule {}
