"use client"

import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon, PaperAirplaneIcon, PencilSquareIcon, CheckCircleIcon, PhoneIcon, PlusIcon, TrashIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { sendMultipleWhatsappInvitation } from "../../../services/organizations";
import { fromJson } from "../../../utils/utils";
import { useSession } from "next-auth/react";
import { Member, OrganizationMember } from "@/types/models";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import { CommonNotification } from "@/components/common/CommonNotification";
import { classNames } from "@/lib/utils";
import InviteMembers from "@/components/shared/InviteMembers";

interface AddMemberProps {
  open: boolean;
  memberId: number;
  organizationId: number;
  onClose: () => void;
}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


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
  const [openMemberUI, setOpenMemberUI] = useState<boolean>(false);
  const [openInviteMembersUI, setOpenInviteMembersUI] = useState<boolean>(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);
  const [openReinvitationNotification, setOpenReinvitationNotification] = useState<boolean>(false);
  const [notificationDescription, setNotificationDescription] = useState<string>("");

  const handleAddMemberClick = () => {
    console.log('handle add member click');
    setSelectedMemberId(0);
    setOpenInviteMembersUI(true);
  }

  const handleMemberClick = async (memberId: number) => {
    console.log('handle member click: ', memberId);
    setSelectedMemberId(memberId);
    setOpenMemberUI(true);
  }

  const handleResendInvitation = async () => {
    const membersToReinvite = members.filter(m => !m.joined);
    console.log("Reinvite ", membersToReinvite);
    const result = await sendMultipleWhatsappInvitation(
      organizationId,
      membersToReinvite,
      session?.accessToken!,
      true
    );
    setNotificationDescription(`${membersToInvite.length} members have been successfully reinvited`)
    setOpenReinvitationNotification(true);
  }

  const handleReInviteMember = async (member: Member) => {
    const result = await sendMultipleWhatsappInvitation(
      organizationId,
      [member],
      session?.accessToken!,
      true
    );
    setNotificationDescription("Member successfully re-invited!")
    setOpenReinvitationNotification(true);
  }

  return (
    <div className="h-full px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Members</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the members of your organization including their name, phone number, email and role.
          </p>
        </div>
        <div className="mt-4 flex gap-1 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="pointer"
            onClick={() => handleResendInvitation()}
          >
            <PaperAirplaneIcon className="h-6 w-6 shrink-0" />
          </button>

          <button
            type="button"
            className="pointer"
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
                    onContextMenu={() => console.log('right click')}
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
                      <span className="isolate inline-flex rounded-md shadow-sm">
                        {/* <button
                          type="button"
                          className="relative text-xs inline-flex items-center rounded-l-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                        >
                          <PencilSquareIcon
                            className="mr-1 h-3 w-3 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="relative text-xs -ml-px inline-flex items-center bg-white px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                        >
                          <TrashIcon className="mr-1 h-3 w-3 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                          Delete
                        </button> */}
                        {!member.joined && <button
                          type="button"
                          className="relative text-xs -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                          onClick={() => handleReInviteMember(member)}
                        >
                          <PaperAirplaneIcon className="mr-1 h-3 w-3" aria-hidden="true"/>
                          ReInvite
                        </button>}
                      </span>
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
      <InviteMembers
        open={openInviteMembersUI}
        organizationId={organizationId}
        onClose={() => setOpenInviteMembersUI(false)}
      />

      <CommonNotification
        title="Invitation resend successfully"
        description={notificationDescription}
        show={openReinvitationNotification}
        onClose={() => setOpenReinvitationNotification(false)}
      />
    </div>
  )
}

export default MembersPage;
