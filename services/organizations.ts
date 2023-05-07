import { Member } from "@/types/models";
import customAxiosInstance from "../utils/axios"
import { API_ORG_MEMBERS_INVITE } from "../utils/constants"
import { toJson } from "../utils/utils";

export const sendInviteOnWhatsapp = async (orgId: number, phone: string, token: string) => {
  const jsonInputs = toJson([{
    phone
  }]);

  return await customAxiosInstance.post(API_ORG_MEMBERS_INVITE(orgId), jsonInputs, { token });
}

export const sendMultipleWhatsappInvitation = async (orgId: number, members: Member[], token: string) => {
  const jsonInputs = toJson(members);

  return await customAxiosInstance.post(API_ORG_MEMBERS_INVITE(orgId), jsonInputs, { token })
}