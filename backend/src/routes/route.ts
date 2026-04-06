import { Hono } from "hono";
import { Env } from "../";
import { AuthController } from "../features/auth/auth.controller";
import { AuthService } from "../features/auth/auth.service";

const apiRouter = new Hono<Env>();

// 認証関連のルート
const authClient = new Hono<Env>();
const authController = new AuthController(new AuthService());
authClient.post('/login', (c) => authController.login<typeof c>(c));
authClient.post('/register', (c) => authController.register(c));
authClient.get('/me', (c) => authController.me(c));

// ルートのマウント
apiRouter.route('/auth', authClient);
apiRouter.get('/ping', (c) => c.json({ message: 'pong' })); // テスト用のルート

export { apiRouter };