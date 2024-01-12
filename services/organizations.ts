import { Member, MemberOfSession, OrganizationMember, Session } from "@/types/models";
import customAxiosInstance from "../lib/axios"
import { API_ORG_CREATE_SESSION, API_ORG_CURRENT_SESSION, API_ORG_MEMBERS_INVITE, API_ORG_SETUP_SESSION_MEMBERS } from "../lib/constants"
import { toJson } from "../lib/utils";

export const getOrganizationMembers = async (orgId: number, token: string) => {
  const data = await customAxiosInstance.get<OrganizationMember[]>(`orgs/${orgId}/members`, { token: token });
  return data;
}

export const sendInviteOnWhatsapp = async (orgId: number, phone: string, token: string) => {
  const jsonInputs = toJson([{
    phone
  }]);

  return await customAxiosInstance.post(API_ORG_MEMBERS_INVITE(orgId), jsonInputs, { token });
}

export const sendMultipleWhatsappInvitation = async (orgId: number, members: Member[], token: string, reInvitation: boolean = false) => {
  const jsonInputs = toJson(members);

  return await customAxiosInstance.post(API_ORG_MEMBERS_INVITE(orgId, reInvitation), jsonInputs, { token })
}

export const getCurrentSession = async (orgId: number, token: string) => {
  return await customAxiosInstance.get(API_ORG_CURRENT_SESSION(orgId), {token})
}

export const createNewSession = async (orgId: number, startDate: string, endDate: string, token: string) => {
  const jsonInputs = toJson({
    startDate,
    endDate
  })
  return await customAxiosInstance.post<Session>(API_ORG_CREATE_SESSION(orgId), jsonInputs, {token})
}

export const getMembersOfSession = async (orgId: number, sessionId: number, token: string) => {
  const data = await customAxiosInstance.get<MemberOfSession[]>(API_ORG_SETUP_SESSION_MEMBERS(orgId, sessionId), { token: token });
  return data;
}

export const addMemberToSession = async (orgId: number, sessionId: number, membershipId: number, token: string) => {
  const jsonInputs = toJson({
    membershipId
  });
  const data = await customAxiosInstance.post<number>(API_ORG_SETUP_SESSION_MEMBERS(orgId, sessionId), jsonInputs, { token: token });
  return data;
}

export const removeMemberFromSession = async (orgId: number, sessionId: number, mosId: number, token: string) => {
  const data = await customAxiosInstance.delete<MemberOfSession[]>(`${API_ORG_SETUP_SESSION_MEMBERS(orgId, sessionId)}/${mosId}`, { token: token });
  return data;
}

export const saveSessionMembers = async (orgId: number, sessionId: number, members: OrganizationMember[], token: string) => {
  const jsonInputs = toJson({
    members
  })
  console.log(jsonInputs);
  return await customAxiosInstance.patch<boolean>(API_ORG_SETUP_SESSION_MEMBERS(orgId, sessionId), jsonInputs, { token });
}
