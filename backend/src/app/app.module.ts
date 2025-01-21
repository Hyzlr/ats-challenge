// lib
import { Module } from '@nestjs/common';

// user-defined modules
import { ConfigModule } from 'src/common/config/config.module';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';
import { CompressionModule } from 'src/common/compression/compression.module';
import { EncryptionKeyModule } from 'src/common/encryption_key/encryption-key.module';

@Module({
  imports: [
    ConfigModule,
    DrizzleModule,
    CompressionModule,
    EncryptionKeyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
