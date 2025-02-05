// lib
import { Module } from '@nestjs/common';
import { ConfigModule as NestJsConfigModule } from '@nestjs/config';

// user-defined modules
import { ConfigService } from './config.service';

// validation zod schema
import {
  envValidationSchema,
  type ValidatedEnvs,
} from 'src/common/config/zod/env.z';

@Module({
  imports: [
    NestJsConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      validate: (config) => envValidationSchema.parse(config) as ValidatedEnvs,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
