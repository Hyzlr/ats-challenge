// lib
import { Module, OnApplicationBootstrap } from '@nestjs/common';

// modules
import { ConfigModule } from '../config/config.module';

// services
import { DrizzleService } from './drizzle.service';

@Module({
  imports: [ConfigModule],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule implements OnApplicationBootstrap {
  constructor(private readonly drizzleService: DrizzleService) {}

  async onApplicationBootstrap() {
    try {
      await this.drizzleService.runMigration();
      console.log(`Migrations ran successfully...`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      process.exit(1);
    }
  }
}
