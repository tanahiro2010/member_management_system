import { z } from "zod";

const InviteTokenPayloadSchema = z.object({
  email: z.email(),
  team_id: z.string(),
  role: z.string().optional()
});
type InviteTokenPayload = z.infer<typeof InviteTokenPayloadSchema>;

export { InviteTokenPayload, InviteTokenPayloadSchema };