/**
 * @file index.ts
 * @description Entry point for the backend application.
 * @author tanahiro2010(田中博悠)
 * @date 2026-03-01
 * 
 * Copyright (c) 2024 UniSchool, All Rights Reserved.
 * This software is licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 * 
 * @version 1.0.0
 * @since 1.0.0
 */
/**
 * このバックエンドアプリケーションでは、Honoフレームワークを使用してシンプルなAPIサーバーを構築しています。
 * MVCアーキテクチャを採用し、ルーティング、コントローラー、サービス、モデルの各層を分離して実装しています。
 * 
 * ルーティング層では、APIエンドポイントを定義し、リクエストを適切なコントローラーにルーティングします。
 * コントローラー層では、ビジネスロジックを実装し、サービス層と連携してデータの処理を行います。
 * サービス層では、データベースとのやり取りや外部APIとの通信などの処理を担当します。
 * モデル層では、データ構造を定義し、データのバリデーションや変換を行います。
 * 
 * この構造により、コードの可読性と保守性が向上し、新機能の追加や既存機能の変更が容易になります。
 * 
 * 各自実装時は、以下の点に注意してください。
 * - コードの可読性を高めるため、適切な命名規則とコードスタイルを遵守してください。
 * - エラーハンドリングを適切に行い、ユーザーにわかりやすいエラーメッセージを提供してください。
 * - セキュリティに配慮し、入力のバリデーションや認証・認可の実装を行ってください。
 * 
 * @example
 * // ルーティングの例
 * app.get('/api/users', userController.getUsers);
 * app.post('/api/users', userController.createUser);
 */

import { Hono, type Context } from 'hono';
import type { D1Database } from '@cloudflare/workers-types';
import type { SessionPayload } from './features/auth/auth.model';
import { type DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import { middleware } from './features/middleware';

export type Env = {
  Variables: {
    name: string;
    db: DrizzleD1Database; // Drizzle ORMを使用してD1データベースにアクセスするための型
    isAuthed: SessionPayload | null;     // 認証状態を示すフラグ
  },
  Bindings: {
    // Cloudflare バインディング
    D1_DATABASE: D1Database; // Cloudflare D1データベースのバインディング


    // 環境変数バインディング
    JWR_SECRET: string; // JWTのシークレットキー
  }
}
export type ContextWithEnv = Context<Env>;

const app = new Hono<Env>();
app.use(async (c, next) => {
  // D1データベースのインスタンスを作成し、コンテキストに追加
  const db = drizzle(c.env.D1_DATABASE);
  c.set('db', db);
  
  await next();
});
app.use('/api/*', middleware); // 認証ミドルウェアをAPIルートに適用

export default app;