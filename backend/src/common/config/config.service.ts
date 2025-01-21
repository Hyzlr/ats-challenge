import { Injectable, Global } from '@nestjs/common';
import { ConfigService as NestJsConfigService } from '@nestjs/config';

// validation schema
import { type ValidatedEnvs } from './zod/env.z';

@Global()
@Injectable()
export class ConfigService extends NestJsConfigService<ValidatedEnvs> {
  constructor() {
    super();
  }

  public getDBConnectionString(): string {
    return `postgres://${this.get('DATABASE_USERNAME')}:${this.get('DATABASE_PASSWORD')}@${this.get('DATABASE_HOST')}:${this.get('DATABASE_PORT')}/${this.get('DATABASE_NAME')}`;
  }

  get IS_PRODUCTION(): boolean {
    return this.get('NODE_ENV', { infer: true }) === 'production';
  }
}
