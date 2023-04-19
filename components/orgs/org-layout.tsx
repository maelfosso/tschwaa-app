"use client";

import Organization from "@/models/organization";
import { BuildingOfficeIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const tabs = [
  { name: 'Home', href: '', current: true },
  { name: 'Members', href: '/members', current: false },
  // { name: 'Settings', href: '/settings', current: false },
]

interface OrganizationLayoutProps {
  children: ReactNode,
  org: Organization
}
const OrganizationLayout = ({ children, org }: OrganizationLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col py-12 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="mx-auto max-w-7xl px-4 py-16 border-b border-gray-200 sm:px-6 sm:py-24 lg:px-8"> */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center">
                    <Image
                      width={'64'} height={'64'}
                      className="hidden h-16 w-16 rounded-full sm:block"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                      alt=""
                    />
                    <div>
                      <div className="flex items-center">
                        <Image
                          width={'64'} height={'64'}
                          className="h-16 w-16 rounded-full sm:hidden"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                          alt=""
                        />
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                          { org.name }
                        </h1>
                      </div>
                      <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Company</dt>
                        <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                          <BuildingOfficeIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          Duke street studio
                        </dd>
                        <dt className="sr-only">Account status</dt>
                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          Verified account
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Add money
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    Send money
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <nav className="isolate flex divide-x divide-gray-200 rounded-bl-lg rounded-br-lg shadow" aria-label="Tabs">
              {tabs.map((tab, tabIdx) => (
                <Link
                  key={tab.name}
                  href={`/orgs/${org.id}${tab.href}`}
                  aria-current={tab.current ? 'page' : undefined}
                  className={classNames(
                    pathname === `/orgs/${org.id}${tab.href}` ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                    tabIdx === 0 ? 'rounded-bl-lg' : '',
                    tabIdx === tabs.length - 1 ? 'rounded-br-lg' : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
                  )}
                >
                  <span>{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      pathname === `/orgs/${org.id}${tab.href}` ? 'bg-rose-500' : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5'
                    )}
                  />
                </Link>
              ))}
            </nav>
          </div>
          
          { children }
        {/* </div> */}
      </div>
    </div>
  )
}

export default OrganizationLayout;
