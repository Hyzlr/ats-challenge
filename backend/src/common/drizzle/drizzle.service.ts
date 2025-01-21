// lib
import { Injectable } from '@nestjs/common';
import * as postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

// services
import { ConfigService } from '../config/config.service';

// schema
import * as schema from './schema';

@Injectable()
export class DrizzleService {
  private db = globalThis as unknown as {
    conn: postgres.Sql | undefined;
  };

  constructor(private readonly configService: ConfigService) {
    if (!this.db.conn) {
      this.db.conn = postgres(this.configService.getDBConnectionString());
    }
  }

  public async runMigration() {
    try {
      const conn = postgres(this.configService.getDBConnectionString(), {
        max: 1,
      });

      await migrate(drizzle(conn, { schema }), {
        migrationsSchema: './schema',
        migrationsFolder: 'migrations',
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  public getDBClient() {
    return drizzle(this.db.conn, { schema });
  }
}
