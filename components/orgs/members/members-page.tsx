"use client"

import { Dialog, Menu, Transition } from "@headlessui/react";
import { ChatBubbleBottomCenterIcon, CheckIcon, ChevronDownIcon, DocumentArrowUpIcon, EllipsisHorizontalIcon, EnvelopeIcon, PaperAirplaneIcon, PlusIcon, TableCellsIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { Notification } from "../../notification";
import { sendInviteOnWhatsapp } from "../../../services/organizations";
import { fromJson } from "../../../utils/utils";
import { useSession } from "next-auth/react";
import { JustInvitedMembers, Member, OrganizationMember } from "@/types/models";
import InviteMembersFromTable from "./invite-members-from-table";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface MembersPageProps {
  orgId: number;
  members: OrganizationMember[];
}

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

const MembersPage = ({ orgId, members }: MembersPageProps) => {
  const { data: session } = useSession();
  const [phone, setPhoneNumber] = useState<string>();
  const [showInvitationNotification, setShowInvitationNotification] = useState<boolean>(false);
  const [justInvitedMembers, setJustInvitedMembers] = useState<JustInvitedMembers[]>([]);
  const [openMembersTableDialog, setOpenMembersTableDialog] = useState<boolean>(false);
  const [openMembersFileDialog, setOpenMembersFileDialog] = useState<boolean>(false);

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

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Members</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the members of your organization including their name, phone number, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            send invitation to non-joined members
          </button>

          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add member
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
                  <tr key={member.id}>
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
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit (replaced by dropdown menu with actions)<span className="sr-only">{`${member.firstName} ${member.lastName}`}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembersPage;
