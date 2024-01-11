import InviteMembers from "@/components/shared/InviteMembers";
import { useQueryString } from "@/lib/hooks";
import { classNames } from "@/lib/utils";
import { MemberOfSession, OrganizationMember } from "@/types/models";
import customAxiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getMembersOfSession, removeMemberFromSession, saveSessionMembers } from "@/services/organizations";

interface MembersSelectionProps {
  organizationId: number;
  sessionId: number;
}

const MembersSelection = ({ organizationId, sessionId }: MembersSelectionProps) => {
  const { data: authSession } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const { createQueryString } = useQueryString();

  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [members, setMembers] = useState<MemberOfSession[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<MemberOfSession[]>([])
  const [openInviteMembersUI, setOpenInviteMembersUI] = useState<boolean>(false);

  useLayoutEffect(() => {
    const isIndeterminate = selectedMembers.length > 0 && selectedMembers.length < members.length
    setChecked(selectedMembers.length === members.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [members.length, selectedMembers]);

  const fetchMembersOfSession = useCallback(async () => {
    const data = await getMembersOfSession(organizationId, sessionId, authSession?.accessToken!) as MemberOfSession[];
    console.log("members of session: ", data);
    setMembers(data);
    setSelectedMembers(data.filter(d => d.id && d.sessionId)); // select only those having MoS information
  }, [authSession?.accessToken, organizationId]);

  useEffect(() => {
    fetchMembersOfSession()
      .catch(console.error);
  }, [fetchMembersOfSession]);

  const updateSessionMembers = useCallback(async () => {
    console.log('into updatesessionmembers callback: ', selectedMembers);
    const data = await saveSessionMembers(organizationId, sessionId, selectedMembers, authSession?.accessToken);
    console.log('update session members', data);
  }, [authSession?.accessToken, organizationId, selectedMembers, sessionId]);

  // useEffect(() => {
  //   updateSessionMembers()
  //   .catch(console.error);
  // }, [updateSessionMembers]);

  const toggleAll = () => {
    console.log('toggleAll', checked, indeterminate);
    setSelectedMembers(checked || indeterminate ? [] : members)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  const handleAddMemberIntoSession = (member: MemberOfSession) => {
    // setSelectedMembers(
    //   e.target.checked
    //     ? [...selectedMembers, member] --- This one
    //     : selectedMembers.filter((p) => p !== member)
    // )
  }

  const handleRemoveMemberFromSession = async (member: MemberOfSession) => {
    const response = await removeMemberFromSession(
      organizationId,
      sessionId,
      member.id,
      authSession?.accessToken
    )
    console.log('handleRemoveMemberFromSession: ', member.id, response);
    if (response) {
      setSelectedMembers(
        selectedMembers.filter((m) => m.id !== member.id)
      )

      // TODO display Notification Success
    } {
      // TODO display Notification Error
    }
  }

  const handleToggleMember = (checked: boolean, member: MemberOfSession) => {
    console.log('toggleMember: ', checked, member);

    if (checked) {  // add
      handleAddMemberIntoSession(member);
    } else {  // remove
      handleRemoveMemberFromSession(member)
    }
  }

  const handleInviteMembersClick = () => {
    console.log('handle add invite click');
    setOpenInviteMembersUI(true);
  }

  return (
    <>
      <div className="mb-8 pt-3 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">Members</h2>
          <p className="mt-2 text-base text-gray-700">
            Select the members you want in this session or Invite new members to join your organization.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handleInviteMembersClick()}
          >
            Invite members
          </button>
        </div>
      </div>
      <div className="flow-root overflow-y-auto">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                  <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                    First name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {members.map((member) => (
                  <tr key={member.phone} className={selectedMembers.includes(member) ? 'bg-gray-50' : undefined}>
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      {selectedMembers.includes(member) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value={member.phone}
                        checked={selectedMembers.includes(member)}
                        onChange={(e) => handleToggleMember(e.target.checked, member)}
                      />
                    </td>
                    <td
                      className={classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedMembers.includes(member) ? 'text-indigo-600' : 'text-gray-900'
                      )}
                    >
                      {member.firstName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.lastName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone}</td>
                    {/* <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {member.firstName}</span>
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <InviteMembers
        open={openInviteMembersUI}
        organizationId={organizationId}
        onClose={() => {
          router.push(pathname + '?' + createQueryString('step', '2'))
          setOpenInviteMembersUI(false);

        }}
      />
    </>
  )
}

export default MembersSelection;
