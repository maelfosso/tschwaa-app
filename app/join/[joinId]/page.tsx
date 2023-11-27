import Join from "@/components/join/join";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import customAxiosInstance from "@/lib/axios";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    joinId: string;
  }
}

const getInvitation = async (joinId: string): Promise<any> => {
  const session = await getServerSession(authOptions);

  const data = await customAxiosInstance.get(`join/${decodeURIComponent(joinId)}`, { token: session?.accessToken });
  return data;
}

export default async function Page({ params: { joinId }}: Props) {
  const invitation = await getInvitation(joinId);

  return <Join {...invitation}></Join>
}