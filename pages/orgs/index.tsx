import { Dialog, Menu, Transition } from "@headlessui/react";
import { BriefcaseIcon, CalendarIcon, CheckIcon, ChevronDownIcon, ChevronRightIcon, CurrencyDollarIcon, LinkIcon, MapPinIcon, PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { unstable_getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { getErrorMessage } from "../../helpers/error";
import Organization from "../../models/organization";
import customAxiosInstance from "../../utils/axios";
import { AUTH_SIGN_IN } from "../../utils/constants";
import { classNames } from "../../utils/utils";
import { authOptions } from "../api/auth/[...nextauth]"

interface OrgsProps {
  orgs: Organization[]
}

const Orgs = ({ orgs }: OrgsProps ) => {
  const [open, setOpen] = useState<boolean>(false)
  const [org, setOrg] = useState<Organization>()

  const onNewOrganization = () => {
    setOpen(true);
  }

  const onCreateOrganization = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const orgId = await customAxiosInstance.post<number>('/orgs', JSON.stringify(org))
      // window.location.reload();
      Router.push(`orgs/${orgId}`)
    } catch (error) {
      console.log("Error ", getErrorMessage(error));
    }
  }

  const renderNoOrg = () => {
    return (
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
              onClick={() => onNewOrganization()}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Organization
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderAllTheOrgs = () =>  {
    return (
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          { orgs.map((org) => (
            <li key={`org-${org.id}`} className="py-4 hover:bg-gray-50">
              <a href={`orgs/${org.id}`} className="block">
                <div className="flex items-center px-4 sm:px-6">
                  <div className="flex flex-col min-w-0 flex-1 ml-3">
                    <h2 className="text-1xl leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">{ org.name }</h2>
                    <p className="text-sm text-gray-500">{ org.description }</p>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

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
            onClick={() => onNewOrganization()}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Organization
          </button>
        </div>
      </div>
      { orgs.length === 0 ? renderNoOrg() : renderAllTheOrgs() }
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <form
                      className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                      onSubmit={onCreateOrganization}
                    >
                      <div className="flex-1">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                              <Dialog.Title className="text-lg font-medium text-gray-900">New Organizations</Dialog.Title>
                              <p className="text-sm text-gray-500">
                                Get Started by filling in the information below to create your new organization
                              </p>
                            </div>
                            <div className="flex h-7 items-center">
                              <button>
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}
                        <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                          {/* Organization name */}
                          <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="organization-name"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                Organization name
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                name="organization-name"
                                id="organization-name"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={(event) => setOrg({...org!, name: event.target.value})}
                              />
                            </div>
                          </div>

                          {/* Organization description */}
                          <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="organization-description"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                Organization description
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <textarea
                                name="organization-description"
                                id="organization-description"
                                rows={3}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={(event) => setOrg({...org!, description: event.target.value})}
                                defaultValue={''}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Action buttons */}
                      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  // const session = await unstable_getServerSession(
  //   context.req,
  //   context.res,
  //   authOptions
  // )

  const data = await customAxiosInstance.get("/orgs")
  console.log('Orgs - ', data);
  return {
    props: { orgs: data }
  }
}

export default Orgs;
