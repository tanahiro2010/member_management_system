import { z } from "zod";
import { JWTBasePayload } from "../../types/jwt";

type SessionPayload = JWTBasePayload & {
    type: 'session'; // トークンの種類を示すフィールド
}

const LoginAPIPayload = z.object({
    email: z.email(),
    password: z.string().min(6).max(128),
});
const RegisterAPIPayload = z.object({
    email: z.email(),
    password: z.string().min(6).max(128),
    name: z.string().min(1).max(100),
});

export type { SessionPayload };
export { LoginAPIPayload, RegisterAPIPayload };