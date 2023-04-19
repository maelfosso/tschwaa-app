import OrganizationLayout from "@/components/orgs/org-layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Organization } from "@/types/models";
import customAxiosInstance from "@/utils/axios";
import { getServerSession } from "next-auth";

interface PageProps {
  params: {
    orgId: number
  },
  children: React.ReactNode
}

const getOrg = async (orgId: number) => {
  const session = await getServerSession(authOptions);

  const data = await customAxiosInstance.get<Organization>(`orgs/${orgId}`, { token: session?.accessToken});
  return data;
}

export default async function Page({ params: { orgId }, children }: PageProps) {
  const org = await getOrg(orgId);

  return <OrganizationLayout org={org}>{ children }</OrganizationLayout>
}




