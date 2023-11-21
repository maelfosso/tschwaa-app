import { Member, Session } from "@/types/models";
import customAxiosInstance from "../utils/axios"
import { API_ORG_CREATE_SESSION, API_ORG_CURRENT_SESSION, API_ORG_MEMBERS_INVITE } from "../utils/constants"
import { toJson } from "../utils/utils";

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