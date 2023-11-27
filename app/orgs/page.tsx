import React from "react";
import customAxiosInstance from "../../lib/axios";
import OrgsPage from "../../components/orgs/orgs-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { Organization } from "@/types/models";

const getOrgs = async () => {
  const session = await getServerSession(authOptions);

  const data = await customAxiosInstance.get("/orgs", { token: session?.accessToken });
  return data as Organization[];
}


export default async function Page() {
  const orgs = await getOrgs();

  return <OrgsPage key={"/orgs"} orgs={orgs} />;
}
