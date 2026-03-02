type JWTBasePayload = {
    sub: string; // ユーザーIDなどの識別子
    exp: number; // トークンの有効期限（Unixタイムスタンプ）
}

export type { JWTBasePayload };