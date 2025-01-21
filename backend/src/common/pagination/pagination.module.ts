// lib
import { Module } from '@nestjs/common';

// modules
import { ConfigModule } from '../config/config.module';
import { CompressionModule } from '../compression/compression.module';
import { DrizzleModule } from '../drizzle/drizzle.module';

// services
import { DrizzleService } from '../drizzle/drizzle.service';

@Module({
  imports: [ConfigModule, CompressionModule, DrizzleModule],
  providers: [DrizzleService],
})
export class PaginationModule {}
