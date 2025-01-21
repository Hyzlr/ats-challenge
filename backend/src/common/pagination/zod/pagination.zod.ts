// lib
import { z } from 'zod';

const fieldType = z.enum(['TEXT', 'NUMERIC', 'BOOLEAN']);

const searchOperationType = z.enum([
  'CONTAINS',
  'DO_NOT_CONTAINS',
  'STARTS_WITH',
  'ENDS_WITH',
  'EQUALS',
  'NOT_EQUAL',
]);

export const paginationSearchSchema = z.object({
  field: z.string().min(1),
  fieldType: fieldType,
  operation: searchOperationType,
  searchValue: z.string(),
});

const sortOrder = z.enum(['ASC', 'DESC']);

export const paginationSortSchema = z.object({
  field: z.string().min(1),
  order: sortOrder,
});

export const paginationSchema = z.object({
  page: z.number().min(1),
  pageSize: z.number().min(1),
  fields: z.array(z.string().min(1)).optional(),
  search: z.array(paginationSearchSchema).optional(),
  sort: z.array(paginationSortSchema).optional(),
});

export type PaginationType = z.infer<typeof paginationSchema>;
export type PaginationSearchType = z.infer<typeof paginationSearchSchema>;
export type PaginationSortType = z.infer<typeof paginationSortSchema>;
