import { DrizzleD1Database } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { users, invites } from "../../lib/schema";
import bcrypt from "bcryptjs";


class AuthService {
    constructor() {}

    async verifyUser(db: DrizzleD1Database, email: string, password: string): Promise<null | typeof users.$inferSelect> {
        const user = await db.select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)
            .execute();

        if (user.length === 0) return null;

        const isValid = await bcrypt.compare(password, user[0].passwordHash);
        return isValid ? user[0] : null;
    }

    async verifyInvite(db: DrizzleD1Database, token: string): Promise<null | typeof invites.$inferSelect> {
        const invite = await db.select()
            .from(invites)
            .where(eq(invites.id, token))
            .limit(1)
            .execute();

        return invite.length > 0 ? invite[0] : null;
    }

    async registerUser(db: DrizzleD1Database, email: string, password: string) {
        const passwordHash = await bcrypt.hash(password, 10);
        const now = new Date();
        return await db.insert(users).values({
            id: crypto.randomUUID(),
            email,
            passwordHash,
            createdAt: now,
            updatedAt: now,
        }).execute();
    }

    async getUserInfo(db: DrizzleD1Database, userId: string): Promise<null | typeof users.$inferSelect> {
        const user = await db.select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)
            .execute();

        return user.length > 0 ? user[0] : null;
    }

    async updateUserInfo(db: DrizzleD1Database, userId: string, data: Partial<typeof users.$inferInsert>) {
        const now = new Date();
        return await db.update(users).set({
            ...data,
            updatedAt: now,
        }).where(eq(users.id, userId)).execute();
    }
}

export { AuthService };