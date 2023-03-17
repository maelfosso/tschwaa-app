import customAxiosInstance from "../utils/axios"
import { API_ORG_MEMBERS_INVITE } from "../utils/constants"
import { toJson } from "../utils/utils";

export const sendInviteOnWhatsapp = async (orgId: number, phoneNumber: string) => {
  const jsonInputs = toJson([{
    phoneNumber
  }]);

  return await customAxiosInstance.post(API_ORG_MEMBERS_INVITE(orgId), jsonInputs);
}