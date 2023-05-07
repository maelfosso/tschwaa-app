"use client";

import { sendInviteOnWhatsapp, sendMultipleWhatsappInvitation } from "@/services/organizations";
import { Member } from "@/types/models";
import { useState } from "react";

// const members = [
//   // { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
//   // More members...
// ]

interface Props {
  orgId: number;
  token: string;
}
const InviteMembersFromTable = ({ orgId, token }: Props) => {
  const [numberOfMembers, setNumberOfMembers] = useState<number>(0)
  const [members, setMembers] = useState<Member[]>([]);

  const addMember = () => {
    setMembers([
      ...members, {
        id: numberOfMembers,
        firstName: "",
        lastName: "",
        sex: "male",
        phone: "",
        email: ""
      }
    ]);
    setNumberOfMembers(numberOfMembers + 1);
  }

  const removeMember = (member: Member) => {
    setMembers(
      members.filter(m => m.id != member.id)
    )
  }

  const updateMember = (memberId: number, attr: string, value: string) => {
    const memberIx = members.findIndex(m => m.id === memberId)
    let member = members[memberIx];
    member = {
      ...member,
      [attr]: value
    }
    setMembers(existingMembers => {
      return [
        ...existingMembers.slice(0, memberIx),
        member,
        ...existingMembers.slice(memberIx + 1)
      ]
    });
  }

  const inviteAllMembers = async () => {
    const membersWithoutId = members.map((m) => ({...m, id: 0 }))
    const data = await sendMultipleWhatsappInvitation(orgId, membersWithoutId, token);
    window.location.reload();
  }
  
  return (
    <form className="px-4 sm:px-6 lg:px-8" onSubmit={() => inviteAllMembers()}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Members</h1>
          {/* <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p> */}
        </div>
        <div className="flex gap-2 mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => addMember()}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add member
          </button>
          <button
            type="button"
            onClick={() => inviteAllMembers()}
            className="block rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            Invite the members
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    First Name
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Last Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Sex
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Phone number
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={`member-${member.id}`}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <div className="relative mt-2">
                        <input
                          type="text"
                          name={`firstName-${member.id}`}
                          id={`firstName-${member.id}`}
                          value={member.firstName}
                          onChange={(e) => updateMember(member.id, 'firstName', e.target.value)}
                          className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Nolino"
                          required
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <div className="relative mt-2">
                        <input
                          type="text"
                          name={`lastName-${member.id}`}
                          id={`lastName-${member.id}`}
                          value={member.lastName}
                          onChange={(e) => updateMember(member.id, 'lastName', e.target.value)}
                          className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="KAM"
                          required
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <select
                        id={`sex-${member.id}`}
                        name={`sex-${member.id}`}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 bg-gray-50 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-50 sm:text-sm sm:leading-6"
                        defaultValue="Male"
                        onChange={(e) => updateMember(member.id, 'sex', e.target.value)}
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="relative mt-2">
                        <input
                          type="text"
                          name={`phone-${member.id}`}
                          id={`phone-${member.id}`}
                          value={member.phone}
                          onChange={(e) => updateMember(member.id, 'phone', e.target.value)}
                          className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="670902211"
                          required
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="relative mt-2">
                        <input
                          type="email"
                          name={`email-${member.id}`}
                          id={`email-${member.id}`}
                          value={member.email}
                          onChange={(e) => updateMember(member.id, 'email', e.target.value)}
                          className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="kam.nolino@gmail.com"
                          required
                        />
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" onClick={(e) => removeMember(member)} className="text-indigo-600 hover:text-indigo-900">
                        Remove<span className="sr-only">, {member.lastName}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  )
}

export default InviteMembersFromTable;
