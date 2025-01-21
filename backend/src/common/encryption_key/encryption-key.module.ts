// lib
import { Module } from '@nestjs/common';

// modules
import { CompressionModule } from '../compression/compression.module';
import { ConfigModule } from '../config/config.module';

// controllers
import { ControllersController } from './controllers/controllers.controller';

@Module({
  imports: [ConfigModule, CompressionModule],
  controllers: [ControllersController],
})
export class EncryptionKeyModule {}
