// lib
import { z } from 'zod';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PgViewBase } from 'drizzle-orm/pg-core/view-base';
import { SQL, Subquery, ColumnsSelection, sql } from 'drizzle-orm';
import { PgTable, TableConfig } from 'drizzle-orm/pg-core';

// services
import { DrizzleService } from '../drizzle/drizzle.service';

// zod schema
import {
  paginationSchema,
  type PaginationType,
  type PaginationSearchType,
  type PaginationSortType,
} from './zod/pagination.zod';

// utils
import generateWhereClause from './utils/generate-where-clause';

@Injectable()
export class Pagination {
  constructor(private readonly drizzleService: DrizzleService) {}

  async handlePagination<
    T extends
      | SQL<unknown>
      | PgTable<TableConfig>
      | Subquery<string, Record<string, unknown>>
      | PgViewBase<string, boolean, ColumnsSelection>,
  >(drizzleModel: T, paginationOptions: PaginationType) {
    try {
      const { page, pageSize, fields } = paginationOptions;
      const search: PaginationSearchType[] = paginationOptions.search;
      const sort: PaginationSortType[] = paginationOptions.sort;
      const dbClient = this.drizzleService.getDBClient();

      // validate payload
      try {
        paginationSchema.parse(paginationOptions);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid pagination options provided',
            errors: error.errors,
          };
        }
      }

      const { count: totalRowCount } = (
        await dbClient
          .select({ count: sql`count(*)`.mapWith(Number) })
          .from(drizzleModel)
      )[0];
      const finalPageNumber = Math.ceil(totalRowCount / pageSize);

      if (page < 1 || page > finalPageNumber) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid page number provided',
        };
      }

      const requiredColumns = fields ? fields.join(', ') : '*';

      const whereClauses: string[] = [];

      if (search.length > 0) {
        for (const searchOption of search) {
          whereClauses.push(generateWhereClause(searchOption));
        }
      }

      const orderByClauses: string[] = [];

      if (sort.length > 0) {
        for (const sortOption of sort) {
          orderByClauses.push(`${sortOption.field} ${sortOption.order}`);
        }
      }

      const query = `
                SELECT ${requiredColumns} FROM ${drizzleModel}
                ${whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''}
                ${sort.length > 0 ? `ORDER BY ${orderByClauses.join(', ')}` : ''}
                LIMIT ${pageSize}
                OFFSET ${(page - 1) * pageSize};
            `;

      const pageData = await dbClient.execute(sql`${query}`);

      return {
        status: 200,
        data: pageData,
        totalCount: totalRowCount,
      };
    } catch (err) {
      throw err;
    }
  }
}
