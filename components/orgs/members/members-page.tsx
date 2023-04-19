"use client"

import { Dialog, Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, DocumentArrowUpIcon, PaperAirplaneIcon, PlusIcon, TableCellsIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { Notification } from "../../notification";
import { sendInviteOnWhatsapp } from "../../../services/organizations";
import { fromJson } from "../../../utils/utils";
import { useSession } from "next-auth/react";
import { JustInvitedMembers, Member } from "@/types/models";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface MembersPageProps {
  orgId: number;
  members: Member[];
}

const MembersPage = ({ orgId, members }: MembersPageProps) => {
  const { data: session } = useSession();
  console.log('member page', session);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [showInvitationNotification, setShowInvitationNotification] = useState<boolean>(false);
  const [justInvitedMembers, setJustInvitedMembers] = useState<JustInvitedMembers[]>([])
  const [openMembersTableDialog, setOpenMembersTableDialog] = useState<boolean>(false);
  const [openMembersFileDialog, setOpenMembersFileDialog] = useState<boolean>(false);

  const handleSendInviteWhatsappClick = async () => {
    const data = await sendInviteOnWhatsapp(orgId, phoneNumber!, session?.accessToken as string);
    setShowInvitationNotification(true);
    setJustInvitedMembers(fromJson(data) as JustInvitedMembers[])
  }

  const handleResendWhatsappInvitationClick = async (to: string) => {
    const data = await sendInviteOnWhatsapp(orgId, to, session?.accessToken as string);
    setShowInvitationNotification(true);
  }

  const handleInviteMultipleMembersClick = async () => {
    setOpenMembersTableDialog(true);
  }

  const handleInviteMembersFileClick = async () => {
    setOpenMembersFileDialog(true);
  }

  return (
    <section className="mt-8 ">
      <Notification
        show={showInvitationNotification}
        onClose={() => setShowInvitationNotification(false)}
        title="Invitations sent"
        content={`a message has been sent to the number ${phoneNumber}`}
      />

      <div className="mx-auto max-w-md sm:max-w-3xl">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">Add members to the organizations</h2>
              <p className="mt-1 text-sm text-gray-500">You haven’t added any team members to your project yet.</p>
            </div>
            <form className="mt-6 sm:flex sm:items-center" action="#">
              <label htmlFor="emails" className="sr-only">
                Phone number
              </label>
              <div className="grid grid-cols-1 sm:flex-auto">
                <input
                  type="text"
                  name="phones"
                  id="phones"
                  className="peer relative col-start-1 row-start-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter a phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div
                  className="col-start-1 col-end-3 row-start-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Send invite
                      <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full px-4 py-2 text-left text-sm'
                              )}
                            >
                              SMS
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full px-4 py-2 text-left text-sm'
                              )}
                              onClick={() => handleSendInviteWhatsappClick()}
                            >
                              WhatsApp
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send invite
                </button> */}
              </div>
            </form>
            <div className="flex items-center gap-x-5 border-t border-gray-200 pt-4 text-sm">
              <button className="flex items-center gap-x-1 font-semibold text-cyan-700 hover:text-cyan-900" onClick={() => handleInviteMultipleMembersClick()}>
                <TableCellsIcon className="h-5 w-5 flex-shrink-0"/> Invite multiple members
              </button>
              <button className="flex items-center gap-x-1 font-semibold text-cyan-700 hover:text-cyan-900" onClick={() => handleInviteMembersFileClick()}>
                <DocumentArrowUpIcon className="h-5 w-5 flex-shrink-0"/> Invite members from CSV or Excel file
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-500">Invited members</h3>
          <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {justInvitedMembers.map((member, memberIdx) => (
              <li key={memberIdx}>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="flex min-w-0 flex-1 items-center space-x-3">
                    <span className="block flex-shrink-0">
                      {/* <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" /> */}
                    </span>
                    <span className="block min-w-0 flex-1">
                      {/* <span className="block truncate text-sm font-medium text-gray-900">{member.name}</span> */}
                      <span className="block truncate text-sm font-medium text-gray-500">{member.phoneNumber}</span>
                      <span className={`block truncate text-sm font-medium ${member.error ? 'text-red-500' : 'text-green-500'}`}>
                        {member.error ? member.error : 'invitation successfully sent'}
                      </span>
                    </span>
                  </span>
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <PaperAirplaneIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
            {members.filter(m => !m.joined).map((member, memberIdx) => (
              <li key={memberIdx}>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => handleResendWhatsappInvitationClick(member.phoneNumber)}
                >
                  <span className="flex min-w-0 flex-1 items-center space-x-3">
                    <span className="block flex-shrink-0">
                      {/* <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" /> */}
                    </span>
                    <span className="block min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-900">{member.firstName}</span>
                      <span className="block truncate text-sm font-medium text-gray-500">{member.phoneNumber}</span>
                    </span>
                  </span>
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <PaperAirplaneIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-500">Members</h3>
          <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {members.filter(m => m.joined).map((person, personIdx) => (
              <li key={personIdx}>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="flex min-w-0 flex-1 items-center space-x-3">
                    <span className="block flex-shrink-0">
                      {/* <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" /> */}
                    </span>
                    <span className="block min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-900">{person.firstName}</span>
                      <span className="block truncate text-sm font-medium text-gray-500">{person.phoneNumber}</span>
                    </span>
                  </span>
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Transition.Root show={openMembersTableDialog} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpenMembersTableDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpenMembersTableDialog(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openMembersFileDialog} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpenMembersFileDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpenMembersFileDialog(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  )
}

export default MembersPage;
