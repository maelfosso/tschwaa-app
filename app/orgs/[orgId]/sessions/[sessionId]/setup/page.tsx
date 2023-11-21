import React from "react";
import { getServerSession } from "next-auth";
import { Organization } from "@/types/models";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import customAxiosInstance from "@/utils/axios";

const getSession = async (orgId: number, sessionId: number) => {
  const session = await getServerSession(authOptions);

  const data = await customAxiosInstance.get<Organization>(`orgs/${orgId}`, { token: session?.accessToken});
  return data;
}

interface PageProps {
  params: {
    orgId: number;
    sessionId: number;
  },
  children: React.ReactNode
}
export default async function Page({ params: { orgId, sessionId }, children }: PageProps) {
  // const orgs = await getSession(orgId, sessionId);

  return <>
    <h1>Session : {orgId} - {sessionId}</h1>
  </>
}
