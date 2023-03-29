import Organization from "../../../models/organization";
import customAxiosInstance from "../../../utils/axios";
import OrgDetailsPage from "../../../components/orgs/org-details-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export default async function Page() {
  return <OrgDetailsPage />
}