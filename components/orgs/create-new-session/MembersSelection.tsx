import InviteMembers from "@/components/shared/InviteMembers";
import { useQueryString } from "@/lib/hooks";
import { classNames } from "@/lib/utils";
import { OrganizationMember } from "@/types/models";
import customAxiosInstance from "@/utils/axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// const members = [
//   { name: 'Lindsay Walton', title: 'Front-end Developer', phone: '699001122' },
//   // More members...
// ]

interface MembersSelectionProps {
  organizationId: number;
}

const getOrganizationMembers = async (orgId: number, token: string) => {
  const data = await customAxiosInstance.get<OrganizationMember[]>(`orgs/${orgId}/members`, { token: token });
  return data;
}

const MembersSelection = ({ organizationId }: MembersSelectionProps) => {
  const { data: authSession } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const { createQueryString } = useQueryString();

  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<OrganizationMember[]>([])
  const [openInviteMembersUI, setOpenInviteMembersUI] = useState<boolean>(false);

  useLayoutEffect(() => {
    const isIndeterminate = selectedMembers.length > 0 && selectedMembers.length < members.length
    setChecked(selectedMembers.length === members.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMembers]);

  const fetchOrganizationMembers = useCallback(async () => {
    const data = await getOrganizationMembers(organizationId, authSession?.accessToken!);
    console.log("members ", data);
    setMembers(data as OrganizationMember[]);
    setSelectedMembers(data as OrganizationMember[]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  useEffect(() => {
    fetchOrganizationMembers()
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAll = () => {
    setSelectedMembers(checked || indeterminate ? [] : members)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  const handleInviteMembersClick = () => {
    console.log('handle add invite click');
    setOpenInviteMembersUI(true);
  }

  return (
    <div className="pt-3">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Members</h1>
          <p className="mt-2 text-sm text-gray-700">
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
      <div className="mt-8 flow-root">
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
                        onChange={(e) =>
                          setSelectedMembers(
                            e.target.checked
                              ? [...selectedMembers, member]
                              : selectedMembers.filter((p) => p !== member)
                          )
                        }
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
    </div>
  )
}

export default MembersSelection;
