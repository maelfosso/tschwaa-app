"use client"

import { Dialog, Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, PaperAirplaneIcon, PencilSquareIcon, PlusIcon, TrashIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { Notification } from "../../notification";
import { sendInviteOnWhatsapp, sendMultipleWhatsappInvitation } from "../../../services/organizations";
import { fromJson } from "../../../utils/utils";
import { useSession } from "next-auth/react";
import { JustInvitedMembers, Member, OrganizationMember } from "@/types/models";
import InviteMembersFromTable from "./invite-members-from-table";
import Countries from "@/utils/countries";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

interface AddMemberProps {
  open: boolean;
  memberId: number;
  organizationId: number;
  onClose: () => void;
}

const MemberUI = ({ open, onClose, memberId, organizationId }: AddMemberProps) => {
  console.log('member ui ', organizationId);
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [member, setMember] = useState<Member>({
    id: 0,
    firstName: '',
    lastName: '',
    sex: 'male',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (memberId === 0) {
      setTitle("New member");
      setSubTitle("Get Started by filling in the information below to add your new member")
    } else {
      setTitle("Edit member");
    }
  }, [memberId]);

  const handleMemberSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // event.stopPropagation();
    console.log('on create member : ', member, organizationId);
    // const data = await sendInviteOnWhatsapp(organizationId, to, session?.accessToken as string);
    // setShowInvitationNotification(true);
    const data = await sendMultipleWhatsappInvitation(
      organizationId, 
      [member],
      session?.accessToken!,
    );
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                    method="post"

                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                    onSubmit={handleMemberSubmit}
                  >
                    { memberId > 0 && <input type="hidden" value={memberId} name="id" id="id" />}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
                            <p className="text-sm text-gray-500">{ subTitle }</p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button onClick={() => onClose()}>
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Phone
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <div className="relative rounded-md shadow-sm">
                              <PhoneNumberInput onChange={(value) => setMember({...member!, phone: value})} />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-900"
                            >
                              First name
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(event) => setMember({...member!, firstName: event.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Last name
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(event) => setMember({...member!, lastName: event.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="sex"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Sex
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                              <div className="flex items-center">
                                <input
                                  id="male"
                                  name="sex"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="male" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                  Male
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="female"
                                  name="sex"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="female" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-900"
                            >
                             Email
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(event) => setMember({...member!, email: event.target.value})}
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
                          onClick={() => onClose()}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Invite
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
  )
}


interface MembersPageProps {
  organizationId: number;
  members: OrganizationMember[];
}

const MembersPage = ({ organizationId, members }: MembersPageProps) => {
  const { data: session } = useSession();
  const [phone, setPhoneNumber] = useState<string>();
  const [showInvitationNotification, setShowInvitationNotification] = useState<boolean>(false);
  const [justInvitedMembers, setJustInvitedMembers] = useState<JustInvitedMembers[]>([]);
  const [openMembersTableDialog, setOpenMembersTableDialog] = useState<boolean>(false);
  const [openMembersFileDialog, setOpenMembersFileDialog] = useState<boolean>(false);
  const [openMemberUI, setOpenMemberUI] = useState<boolean>(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);

  const handleSendInviteWhatsappClick = async () => {
    const data = await sendInviteOnWhatsapp(orgId, phone!, session?.accessToken as string);
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

  const handleAddMemberClick = () => {
    console.log('handle add member click');
    setSelectedMemberId(0);
    setOpenMemberUI(true);
  }

  const handleMemberClick = async (memberId: number) => {
    console.log('handle member click: ', memberId);
    setSelectedMemberId(memberId);
    setOpenMemberUI(true);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Members</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the members of your organization including their name, phone number, email and role.
          </p>
        </div>
        <div className="mt-4 flex gap-y-1 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className=""
          >
            <PaperAirplaneIcon className="h-6 w-6 shrink-0" />
          </button>

          <button
            type="button"
            className=""
            onClick={() => handleAddMemberClick()}
          >
            <UserPlusIcon className="h-6 w-6 shrink-0"/>
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    First name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Sex
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Position
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">Joined</span>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {members.map((member) => (
                  <tr key={member.id}
                    className="hover:cursor-pointer hover:bg-gray-50"
                    onClick={() => handleMemberClick(member.id)}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {member.firstName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.lastName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.sex}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.position}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.role}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {
                        member.joined &&
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          joined
                        </span>
                      }
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit (replaced by dropdown menu with actions)<span className="sr-only">{`${member.firstName} ${member.lastName}`}</span>
                      </a> */}
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className="'text-gray-700 group flex items-center px-4 py-2 text-sm"
                                  >
                                    <PencilSquareIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Edit
                                  </a>
                                )}
                              </Menu.Item>
                              {/* <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm'
                                    )}
                                  >
                                    <DocumentDuplicateIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Duplicate
                                  </a>
                                )}
                              </Menu.Item> */}
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className="text-gray-700 group flex items-center px-4 py-2 text-sm"
                                  >
                                    <TrashIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    Delete
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MemberUI
        open={openMemberUI}
        memberId={selectedMemberId}
        organizationId={organizationId}
        onClose={() => setOpenMemberUI(false)}
      />
    </div>
  )
}

export default MembersPage;
