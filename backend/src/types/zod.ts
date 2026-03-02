import { createSchemaFactory } from "drizzle-zod";
import z from "zod";
import * as Schema from "../lib/schema";

const factory = createSchemaFactory({
    zodInstance: z,
    coerce: {
        date: true,
        string: true,
        boolean: true,
        number: true,
    }
});

const UserInsertSchema = factory.createInsertSchema(Schema.users);
const UserSelectSchema = factory.createSelectSchema(Schema.users);
const UserUpdateSchema = factory.createUpdateSchema(Schema.users);

const UserLogsInsertSchema = factory.createInsertSchema(Schema.userLogs);
const UserLogsSelectSchema = factory.createSelectSchema(Schema.userLogs);
const UserLogsUpdateSchema = factory.createUpdateSchema(Schema.userLogs);

const InvitesInsertSchema = factory.createInsertSchema(Schema.invites);
const InvitesSelectSchema = factory.createSelectSchema(Schema.invites);
const InvitesUpdateSchema = factory.createUpdateSchema(Schema.invites);

const TokensInsertSchema = factory.createInsertSchema(Schema.tokens);
const TokensSelectSchema = factory.createSelectSchema(Schema.tokens);
const TokensUpdateSchema = factory.createUpdateSchema(Schema.tokens);

const TeamsInsertSchema = factory.createInsertSchema(Schema.teams);
const TeamsSelectSchema = factory.createSelectSchema(Schema.teams);
const TeamsUpdateSchema = factory.createUpdateSchema(Schema.teams);

const TeamRolesInsertSchema = factory.createInsertSchema(Schema.teamRoles);
const TeamRolesSelectSchema = factory.createSelectSchema(Schema.teamRoles);
const TeamRolesUpdateSchema = factory.createUpdateSchema(Schema.teamRoles);

const TeamMembersInsertSchema = factory.createInsertSchema(Schema.teamMembers);
const TeamMembersSelectSchema = factory.createSelectSchema(Schema.teamMembers);
const TeamMembersUpdateSchema = factory.createUpdateSchema(Schema.teamMembers);

const SurveyInsertSchema = factory.createInsertSchema(Schema.surveys);
const SurveySelectSchema = factory.createSelectSchema(Schema.surveys);
const SurveyUpdateSchema = factory.createUpdateSchema(Schema.surveys);

const SurveyResponsesInsertSchema = factory.createInsertSchema(Schema.surveyResponses);
const SurveyResponsesSelectSchema = factory.createSelectSchema(Schema.surveyResponses);
const SurveyResponsesUpdateSchema = factory.createUpdateSchema(Schema.surveyResponses);

const AnnouncementInsertSchema = factory.createInsertSchema(Schema.announcements);
const AnnouncementSelectSchema = factory.createSelectSchema(Schema.announcements);
const AnnouncementUpdateSchema = factory.createUpdateSchema(Schema.announcements);

export {
    UserInsertSchema,
    UserSelectSchema,
    UserUpdateSchema,

    UserLogsInsertSchema,
    UserLogsSelectSchema,
    UserLogsUpdateSchema,

    InvitesInsertSchema,
    InvitesSelectSchema,
    InvitesUpdateSchema,

    TokensInsertSchema,
    TokensSelectSchema,
    TokensUpdateSchema,

    TeamsInsertSchema,
    TeamsSelectSchema,
    TeamsUpdateSchema,

    TeamRolesInsertSchema,
    TeamRolesSelectSchema,
    TeamRolesUpdateSchema,

    TeamMembersInsertSchema,
    TeamMembersSelectSchema,
    TeamMembersUpdateSchema,

    SurveyInsertSchema,
    SurveySelectSchema,
    SurveyUpdateSchema,

    SurveyResponsesInsertSchema,
    SurveyResponsesSelectSchema,
    SurveyResponsesUpdateSchema,

    AnnouncementInsertSchema,
    AnnouncementSelectSchema,
    AnnouncementUpdateSchema,
};