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
    <div className="container mx-auto">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Organizations
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Create
            </button>
          </span>

          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              More
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Create
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {/* <div className="flex flex-row min-h-screen justify-center items-center">
        <h1>Here are all the organization you are in</h1>
      </div> */}
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
