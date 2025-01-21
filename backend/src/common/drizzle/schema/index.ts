// lib
import {
  pgTableCreator,
  timestamp,
  bigserial,
  text,
  varchar,
  bigint,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { name } from '../../../../package.json';

const createTable = pgTableCreator(
  (tableName) =>
    `${name.replaceAll('-', '_').replaceAll('@', '_')}_${tableName}`,
);

// ===================================================================================
// Admin Users
// ===================================================================================

export const admins = createTable('admins', {
  id: bigserial('id', { mode: 'number' }).primaryKey().notNull(),
  firstName: varchar('first_name', { length: 200 }).notNull(),
  lastName: varchar('last_name', { length: 200 }).notNull(),
  email: varchar('email', { length: 250 }).notNull().unique(),
  role: bigint('role_id', { mode: 'number' })
    .notNull()
    .references(() => roles.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const insertAdminTableSchema = createInsertSchema(admins, {
  firstName: (schema) =>
    schema.firstName
      .min(1, {
        message: 'First name is required and cannot be empty.',
      })
      .max(200, {
        message: 'First name must be at most 200 characters long.',
      }),
  lastName: (schema) =>
    schema.lastName
      .min(1, {
        message: 'Last name is required and cannot be empty.',
      })
      .max(200, {
        message: 'Last name must be at most 200 characters long.',
      }),
  email: (schema) =>
    schema.email
      .email({
        message: 'A valid email address is required.',
      })
      .min(1, {
        message: 'Email cannot be empty.',
      }),
});

export const selectAdminTableSchema = createSelectSchema(admins);

// ===================================================================================
// Roles
// ===================================================================================

export const roles = createTable('roles', {
  id: bigserial('id', { mode: 'number' }).primaryKey().notNull(),
  role: varchar('role', { length: 150 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const insertRoleTableSchema = createInsertSchema(roles, {
  role: (schema) =>
    schema.role
      .min(1, {
        message: 'Role name is required and cannot be empty.',
      })
      .max(150, {
        message: 'Role name must be at most 150 characters long.',
      }),
  description: (schema) =>
    schema.description.min(1, {
      message: 'Description is required and cannot be empty.',
    }),
});

export const selectRoleTableSchema = createSelectSchema(roles);

// ===================================================================================
// Permissions
// ===================================================================================

export const permissions = createTable('permissions', {
  id: bigserial('id', { mode: 'number' }).primaryKey().notNull(),
  roleId: bigint('role_id', { mode: 'number' })
    .notNull()
    .references(() => roles.id),
  permission: varchar('permission', { length: 450 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const insertPermissionTableSchema = createInsertSchema(permissions, {
  permission: (schema) =>
    schema.permission
      .min(1, {
        message: 'Permission name is required and cannot be empty.',
      })
      .max(450, {
        message: 'Permission name must be at most 450 characters long.',
      }),
  description: (schema) =>
    schema.description.min(1, {
      message: 'Description is required and cannot be empty.',
    }),
});

export const selectPermissionTableSchema = createSelectSchema(permissions);

// ===================================================================================
