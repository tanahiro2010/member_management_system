import { Next } from "hono";
import type { ContextWithEnv } from "../index";
import { getCookie } from "hono/cookie";
import { verifyToken } from "../lib/utils/jwt";
import { SessionPayload } from "./auth/auth.model";


const getTokenFromHeader = (c: ContextWithEnv): string | null => {
    const authHeader = c.req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.replace('Bearer ', '');
    }
    return getCookie(c, 'authToken') ?? null; // クッキーからトークンを取得
}

const middleware = async (c: ContextWithEnv, next: Next) => {
    const token = getTokenFromHeader(c);
    const isAuthed = token ? await verifyToken(token, c.env.JWR_SECRET ?? "DEFAULT_JWT_TOKEN") : null;
    c.set('isAuthed', isAuthed as SessionPayload | null);

    console.log('Request received:', c.req.method, c.req.url);
    console.log('Authentication status:', isAuthed ? 'Authenticated' : 'Not authenticated');

    return await next();
}

export { middleware };