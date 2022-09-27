import { Menu, Transition } from "@headlessui/react";
import { BriefcaseIcon, CalendarIcon, CheckIcon, ChevronDownIcon, CurrencyDollarIcon, LinkIcon, MapPinIcon, PencilIcon, PlusIcon } from "@heroicons/react/20/solid";
import { unstable_getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
import { Fragment, useEffect } from "react";
import { get } from "../../utils/axios";
import { classNames } from "../../utils/utils";
import { authOptions } from "../api/auth/[...nextauth]"

interface Organization {
  id: number;
  code: string;
  name: string;
}

interface OrgsProps {
  orgs: Organization[]
}

const Orgs = ({ orgs }: OrgsProps ) => {
  const { data, status } = useSession();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth/sign-in")
    }
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            Organizations
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Organization
          </button>
        </div>
      </div>
      <div className="text-center">
        <div
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Organizations</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating an organization</p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Organization
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  const data = await get("/orgs", { token: session?.accessToken as string })

  return {
    props: { orgs: [] }
  }
}
export default Orgs;
