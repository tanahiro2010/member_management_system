/**
 * このファイルには、データベースに関するコードを記述します。
 * このプロジェクトはDrizzle ORMを使用しているため、Drizzle ORMに関するコードを記述します。
 * テーブルの型定義、クライアントの作成までをここで記述します。
 * 接続先はCloudflare D1を想定しています。SQLiteの機能をチェックしてください。
 */

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { Scope } from '../types/scope';

export const users = sqliteTable('users', { // ユーザーテーブルの定義
    id:       text('id').primaryKey(),
    isAuthed: integer('is_authed', { mode: "boolean" }).notNull().default(false), // 認証されているかどうかを示すフラグ
    scopes:   text('scopes', { mode: "json" }).notNull().default(["read_profile", "write_profile"] as Scope[]), // ユーザーのスコープをJSON形式で保存

    name:         text('name').notNull().default("unknown"),
    email:        text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    role:         text('role', { enum: ["student", "leader", "teacher", "admin"] }).notNull().default("student"),

    createdAt:   integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt:   integer('updated_at', { mode: "timestamp" }).notNull(),
    lastLoginAt: integer('last_login_at', { mode: "timestamp" }),
});

export const userLogs = sqliteTable('user_logs', { // ユーザーログテーブルの定義
    id:        text('id').primaryKey(),
    userId:    text('user_id').notNull(), // ユーザーID
    name:      text('name').notNull(), // ユーザーの名前（ログの内容をわかりやすくするために保存）
    action:    text('action').notNull(),   // ログの内容を示す文字列（例: "login", "logout", "update_profile"など）
    timestamp: integer('timestamp', { mode: "timestamp" }).notNull(), // ログのタイムスタンプ
});

export const tokens = sqliteTable('tokens', { // APIトークンテーブルの定義
    id:        text('id').primaryKey(),
    userId:    text('user_id').notNull(),    // トークンが紐づくユーザーのID
    tokenHash: text('token_hash').notNull(), // トークンのハッシュ値
    scopes:    text('scopes', { mode: "json" }).notNull().default(["read_profile"] as Scope[]), // トークンのスコープをJSON形式で保存
    
    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
    expiredAt: integer('expired_at', { mode: "timestamp" }).notNull(),
    lastUsedAt: integer('last_used_at', { mode: "timestamp" }),
});

export const teams = sqliteTable('teams', { // チームテーブルの定義
    id:          text('id').primaryKey(),
    name:        text('name').notNull(),
    description: text('description'),
    
    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
});

export const teamRoles = sqliteTable('team_roles', { // チームロールテーブルの定義
    id:          text('id').primaryKey(),
    teamId:      text('team_id').notNull(), // チームID
    name:        text('name').notNull(),      // ロール名
    permissions: text('scopes', { mode: "json" }).notNull().default([] as Scope[]), // ロールに紐づく権限をJSON形式で保存

    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
});

export const teamMembers = sqliteTable('team_members', { // チームメンバーテーブルの定義
    id:     text('id').primaryKey(),
    teamId: text('team_id').notNull(), // チームID
    userId: text('user_id').notNull(), // ユーザーID
    role:   text('role'),                // チーム内での役割

    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
});

export const announcements = sqliteTable('announcements', { // お知らせテーブルの定義
    id:      text('id').primaryKey(),
    title:   text('title').notNull().default('an announcement'),   // お知らせのタイトル
    content: text('content').notNull().default('an announcement'), // お知らせの内容

    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
});

export const surveys = sqliteTable('surveys', { // アンケートテーブルの定義
    id:      text('id').primaryKey(),
    title:   text('title').notNull().default('a survey'),   // アンケートのタイトル
    content: text('content', { mode: "json" }).notNull().default({}), // アンケートの内容（JSON形式で保存）

    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
});

export const surveyResponses = sqliteTable('survey_responses', { // アンケート回答テーブルの定義
    id:       text('id').primaryKey(),
    surveyId: text('survey_id').notNull(), // アンケートID
    userId:   text('user_id').notNull(),   // ユーザーID
    response: text('response', { mode: "json" }).notNull().default({}), // アンケートの回答内容（JSON形式で保存）

    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
});

export const invites = sqliteTable('invites', { // 招待テーブルの定義
    id:        text('id').primaryKey(),
    teamId:    text('team_id').notNull(), // 招待されるチームのID
    email:     text('email').notNull(),   // 招待されるユーザーのメールアドレス
    role:      text('role'),              // 招待されたユーザーのチーム内での役割

    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
    expiredAt: integer('expired_at', { mode: "timestamp" }).notNull(),
});

export const mailAuthTokens = sqliteTable('mail_auth_tokens', { // メール認証トークンテーブルの定義
    id:        text('id').primaryKey(),
    email:     text('email').notNull(),      // 認証するユーザーのメールアドレス
    tokenHash: text('token_hash').notNull(), // トークンのハッシュ値

    createdAt: integer('created_at', { mode: "timestamp" }).notNull(),
    updatedAt: integer('updated_at', { mode: "timestamp" }).notNull(),
    expiredAt: integer('expired_at', { mode: "timestamp" }).notNull(),
});