
import MembersPage from "@/components/orgs/members/members-page";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Member, OrganizationMember } from "@/types/models";
import customAxiosInstance from "@/lib/axios";
import { getServerSession } from "next-auth";

const getMembers = async (orgId: number) => {
  const session = await getServerSession(authOptions);

  const data = await customAxiosInstance.get<OrganizationMember[]>(`orgs/${orgId}/members`, { token: session?.accessToken });
  return data;
}

interface PageProps {
  params: { 
    orgId: number
  }
}

export default async function Page({ params: { orgId }}: PageProps) {
  const members = await getMembers(orgId);

  console.log('members : ', members);
  return <MembersPage organizationId={orgId} members={members} />
}

