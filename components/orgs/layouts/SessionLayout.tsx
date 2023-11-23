"use client";

import { CheckIcon, Bars3Icon, BellIcon, BuildingOfficeIcon, CalendarIcon, CheckCircleIcon, ChevronDownIcon, ChevronLeftIcon, ChevronUpDownIcon, Cog6ToothIcon, ExclamationCircleIcon, FolderIcon, HomeIcon, MagnifyingGlassIcon, PencilSquareIcon, UsersIcon, XMarkIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import Navbar from "../../navbar";
import { Combobox, Dialog, Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { Organization, Session } from "@/types/models";
import { getCurrentSession } from "@/services/organizations";
import NoCurrentSession from "../NoCurrentSession";
import CreateNewSession from "../CreateNewSession";
import { useQueryString } from "@/lib/hooks";
import { classNames } from "@/lib/utils";
import SessionSidebar from "./SessionSidebar";

const navigation = [
  { name: 'Home', href: '', icon: HomeIcon, current: true },
  { name: 'Members', href: '/members', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
]
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

const items = [
  {
    id: 1,
    name: 'Text',
    description: 'Add freeform text with basic formatting options.',
    url: '#',
    color: 'bg-indigo-500',
    icon: PencilSquareIcon,
  },
  // More items...
]

const SwitchingOrganization = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [query, setQuery] = useState('')
  const filteredItems = query.length > 0 ? items.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase())
  }) : items;

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(item) => console.log('combobox changed : ', item)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredItems.length > 0 && (
                  <Combobox.Options static className="max-h-96 scroll-py-3 overflow-y-auto p-3">
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        value={item}
                        className={({ active }) =>
                          classNames('flex cursor-default select-none rounded-xl p-3', active && 'bg-gray-100')
                        }
                      >
                        {({ active }) => (
                          <>
                            <div className="ml-4 flex-auto">
                              <p
                                className={classNames(
                                  'text-sm font-medium',
                                  active ? 'text-gray-900' : 'text-gray-700'
                                )}
                              >
                                {item.name}
                              </p>
                              <p className={classNames('text-sm', active ? 'text-gray-700' : 'text-gray-500')}>
                                {item.description}
                              </p>
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && filteredItems.length === 0 && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <ExclamationCircleIcon
                      type="outline"
                      name="exclamation-circle"
                      className="mx-auto h-6 w-6 text-gray-400"
                    />
                    <p className="mt-4 font-semibold text-gray-900">No organizations found</p>
                    <p className="mt-2 text-gray-500">No organizations found for this search term. Please try again.</p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

interface OrganizationLayoutProps {
  children: ReactNode,
  org: Organization
}

const SessionLayout = ({ children, org }: OrganizationLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const { createQueryString, emptyQueryString } = useQueryString();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSwitchOrg, setOpenSwitchOrg] = useState(false);
  const [navigationState, setNavigationState] = useState<string>("");

  const { data: authSession } = useSession();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  useEffect(() => {
    if (searchParams.has("ns")) {
      const value = searchParams.get("ns");
      console.log("sp", value);
      setNavigationState(value!);
    }
  }, [searchParams]);

  const fetchCurrentSession = useCallback(async () => {
    if (org.id) {
      const session = await getCurrentSession(org.id, authSession?.accessToken!);
      setCurrentSession(session as Session)

      if (session === null) {
        emptyQueryString();
        router.push(pathname + '?' + createQueryString('ns', 'no-session'));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org])

  useEffect(() => {
    fetchCurrentSession()
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCurrentSession]);

  const handleCreateNewSession = () => {
    console.log('handle create new session');
    router.push(pathname + '?' + createQueryString('ns', 'new-session'))
  }

  const renderNavigationState = (ns: string) => {
    switch (ns) {
      case "no-session":
        return <NoCurrentSession
          open={true}
          onCreateNewSession={() => handleCreateNewSession()}
        />
      case "new-session":
        return <CreateNewSession organizationId={org.id} />
      default:
        return <></>
    }
  }

  return (
    <>
      <SessionSidebar show={!pathname?.endsWith("setup")} />

      <div className="">
        <h1>SESSSIONNNNN XXXXXX</h1>
      </div>
    </>
  )
}

export default SessionLayout;
