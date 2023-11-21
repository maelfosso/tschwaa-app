export const AUTH_SIGN_UP = "/auth/sign-up";
export const AUTH_SIGN_IN = "/auth/sign-in";

export const API_AUTH_SIGN_UP = "/auth/signup";
export const API_AUTH_SIGN_IN = "/auth/signin";

export const API_ORG_MEMBERS_INVITE = (orgId: number, reInvitation: boolean = false) => `/orgs/${orgId}/members/invite?reInvitation=${reInvitation}`;

export const API_ORG_CURRENT_SESSION = (orgId: number) => `/orgs/${orgId}/sessions/current`;
export const API_ORG_CREATE_SESSION = (orgId: number) => `/orgs/${orgId}/sessions`;
