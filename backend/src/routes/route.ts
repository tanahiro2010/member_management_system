import { Hono } from "hono";
import app, { Env } from "../";
import { AuthController } from "../features/auth/auth.controller";
import { AuthService } from "../features/auth/auth.service";

// 認証関連のルート
const authClient = new Hono<Env>();
const authController = new AuthController(new AuthService());
authClient.post('/login', (c) => authController.login<typeof c>(c));
authClient.post('/register', (c) => authController.register(c));
authClient.get('/me', (c) => authController.me(c));

// ルートのマウント
app.route('/api/auth/*', authClient);