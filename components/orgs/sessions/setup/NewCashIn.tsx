"use client";

import { classNames } from "@/lib/utils";
import { getOrganizationMembers } from "@/services/organizations";
import { MemberContribution, OrganizationMember } from "@/types/models";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const team = [
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

const yesOrNo = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
]

const plans = [
  { id: 'small', name: 'Small', description: '4 GB RAM / 2 CPUS / 80 GB SSD Storage' },
  { id: 'medium', name: 'Medium', description: '8 GB RAM / 4 CPUS / 160 GB SSD Storage' },
  { id: 'large', name: 'Large', description: '16 GB RAM / 8 CPUS / 320 GB SSD Storage' },
]

interface Props {
  organizationId: number;
  open: boolean;
  onClose: () => void;
}

const NewCashIn = ({ organizationId , open, onClose }: Props) => {
  const { data: authSession } = useSession();
  const [enabled, setEnabled] = useState(false)
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [concernedMembers, setConcernedMembers] = useState<OrganizationMember[]>([]);
  const [membersContribution, setMembersContribution] = useState<MemberContribution[]>([]);

  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const [bouffable, setBouffable] = useState<boolean>(false);

  useLayoutEffect(() => {
    const isIndeterminate = concernedMembers.length > 0 && concernedMembers.length < members.length;
    setChecked(concernedMembers.length === members.length);
    setIndeterminate(isIndeterminate);
    // checkbox.current.indeterminate = isIndeterminate;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concernedMembers]);

  const fetchOrganizationMembers = useCallback(async () => {
    const data = await getOrganizationMembers(organizationId, authSession?.accessToken!);
    setMembers(data as OrganizationMember[]);
    setConcernedMembers(data as OrganizationMember[]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  useEffect(() => {
    fetchOrganizationMembers()
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (concernedMembers.length > 0) {
      const membersContribution = concernedMembers.map((member) => {
        const { id, firstName, lastName, phone, sex, email } = member;

        return {
          id,
          firstName,
          lastName,
          phone,
          sex,
          email,
          amount: 0
        };
      })
      setMembersContribution(membersContribution);
    }
  }, [concernedMembers])

  const toggleAllConcernedMembers = () => {
    setConcernedMembers(checked || indeterminate ? [] : members)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            New Cash in
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => onClose()}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Fill up the form
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="project-name"
                                  id="project-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <Switch.Group as="div" className="flex items-center justify-between">
                                <span className="flex flex-grow flex-col">
                                  <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
                                    Bouffable?
                                  </Switch.Label>
                                  <Switch.Description as="span" className="text-sm text-gray-500">
                                    Will the collected money be given to a member?
                                  </Switch.Description>
                                </span>
                                <Switch
                                  checked={bouffable}
                                  onChange={setBouffable}
                                  className={classNames(
                                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      enabled ? 'translate-x-5' : 'translate-x-0',
                                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                  />
                                </Switch>
                              </Switch.Group>
                            </div>
                            <div>
                              <div
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Members who are participating
                              </div>
                              <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                                <table className="min-w-full table-fixed divide-y divide-gray-300">
                                  <thead>
                                    <tr>
                                      <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                        <input
                                          type="checkbox"
                                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                          ref={checkbox}
                                          checked={checked}
                                          onChange={toggleAllConcernedMembers}
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
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                    {members.map((member) => (
                                      <tr key={member.phone} className={concernedMembers.includes(member) ? 'bg-gray-50' : undefined}>
                                        <td className="relative px-7 sm:w-12 sm:px-6">
                                          {concernedMembers.includes(member) && (
                                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                          )}
                                          <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            value={member.phone}
                                            checked={concernedMembers.includes(member)}
                                            onChange={(e) =>
                                              setConcernedMembers(
                                                e.target.checked
                                                  ? [...concernedMembers, member]
                                                  : concernedMembers.filter((p) => p !== member)
                                              )
                                            }
                                          />
                                        </td>
                                        <td
                                          className={classNames(
                                            'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                            concernedMembers.includes(member) ? 'text-indigo-600' : 'text-gray-900'
                                          )}
                                        >
                                          {member.firstName}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.lastName}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div>
                              <label className="text-base font-semibold text-gray-900">Contribution amount</label>
                              <p className="text-sm text-gray-500">Are all the members contributing the same amount</p>
                              <fieldset className="mt-4">
                                <legend className="sr-only">Notification method</legend>
                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                  {yesOrNo.map((answer) => (
                                    <div key={answer.id} className="flex items-center">
                                      <input
                                        id={answer.id}
                                        name="notification-method"
                                        type="radio"
                                        defaultChecked={answer.id === 'no'}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                      <label htmlFor={answer.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                        {answer.title}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </fieldset>
                            </div>
                            <div>
                              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Amount
                              </label>
                              <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                  type="text"
                                  name="price"
                                  id="price"
                                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    F CFA
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Contribution of different members
                              </div>
                              <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                                <table className="min-w-full table-fixed divide-y divide-gray-300">
                                  <thead>
                                    <tr>
                                      <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                        First name
                                      </th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Last name
                                      </th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Phone
                                      </th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Amount
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                    {membersContribution.map((member) => (
                                      <tr key={member.phone}>
                                        <td
                                          className={classNames(
                                            'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                            // concernedMembers.includes(member) ? 'text-indigo-600' : 'text-gray-900'
                                          )}
                                        >
                                          {member.firstName}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.lastName}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone}</td>
                                        <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">{member.amount}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <fieldset>
                              <legend className="text-sm font-medium leading-6 text-gray-900">Frequency</legend>
                              <div className="mt-2 space-y-4">
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="privacy-public"
                                      name="privacy"
                                      aria-describedby="privacy-public-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      defaultChecked
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label htmlFor="privacy-public" className="font-medium text-gray-900">
                                      Once
                                    </label>
                                    <p id="privacy-public-description" className="text-gray-500">
                                      Everyone with the link will see this project.
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-6 items-center">
                                      <input
                                        id="privacy-private-to-project"
                                        name="privacy"
                                        aria-describedby="privacy-private-to-project-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <label htmlFor="privacy-private-to-project" className="font-medium text-gray-900">
                                        At every meeting
                                      </label>
                                      <p id="privacy-private-to-project-description" className="text-gray-500">
                                        Only members of this project would be able to access.
                                      </p>
                                    </div> 
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                            <div>
                              <label className="text-base font-semibold text-gray-900">Deadline</label>
                              <p className="text-sm text-gray-500"></p>
                              <div className="space-y-5">
                                {plans.map((plan) => (
                                  <div key={plan.id} className="relative flex items-start">
                                    <div className="flex h-6 items-center">
                                      <input
                                        id={plan.id}
                                        aria-describedby={`${plan.id}-description`}
                                        name="plan"
                                        type="radio"
                                        defaultChecked={plan.id === 'small'}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                      <label htmlFor={plan.id} className="font-medium text-gray-900">
                                        {plan.name}
                                      </label>
                                      <p id={`${plan.id}-description`} className="text-gray-500">
                                        {plan.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                When?
                              </label>
                              <div className="mt-2">
                                - at the meeting
                                - at its turn
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Who is eating?
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="project-name"
                                  id="project-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <Switch.Group as="div" className="flex items-center justify-between">
                                <span className="flex flex-grow flex-col">
                                  <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
                                    Everybody is contributing the same amount.
                                  </Switch.Label>
                                  <Switch.Description as="span" className="text-sm text-gray-500"></Switch.Description>
                                </span>
                                <Switch
                                  checked={enabled}
                                  onChange={setEnabled}
                                  className={classNames(
                                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      enabled ? 'translate-x-5' : 'translate-x-0',
                                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                  />
                                </Switch>
                              </Switch.Group>
                            </div>
                            <div>
                              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Which amount?
                                Decochez les membres qui ne participent pas a cette cotisation
                              </label>
                              <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                  type="text"
                                  name="price"
                                  id="price"
                                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    F CFA
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Amount
                              </label>
                              <div className="mt-2">
                                <input
                                  type=""
                                  name="project-name"
                                  id="project-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div> 
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Deadline
                              </label>
                              <div className="mt-2">
                                - the day/hours of the meeting
                                - few day/hours (xxx) before the meeting
                                - 
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Amount to contribute per member
                              </label>
                              <div className="mt-2">
                                <table className="min-w-full table-fixed divide-y divide-gray-300">
                                  <thead>
                                    <tr>
                                      <th></th>
                                      <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                        Full name
                                      </th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Phone
                                      </th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Amount
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>

                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div> 
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Frequence of contribution
                              </label>
                              <div className="mt-2">
                                - once in the session
                                - at each meeting
                                - 
                              </div>
                            </div>
                            <div> 
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Amount to eat
                              </label>
                              <div className="mt-2">
                                - once in the session
                                - at each meeting
                                - 
                              </div>
                            </div>
                            <div> 
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                D 
                              </label>
                              <div className="mt-2">
                                - once in the session
                                - at each meeting
                                - 
                              </div>
                            </div> */}
                            
                          </div>
                          <div className="pb-6 pt-4">
                            <div className="flex text-sm">
                              <a
                                href="#"
                                className="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900"
                              >
                                <LinkIcon
                                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                  aria-hidden="true"
                                />
                                <span className="ml-2">Copy link</span>
                              </a>
                            </div>
                            <div className="mt-4 flex text-sm">
                              <a href="#" className="group inline-flex items-center text-gray-500 hover:text-gray-900">
                                <QuestionMarkCircleIcon
                                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span className="ml-2">Learn more about sharing</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => onClose()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
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

export default NewCashIn;

{/* <div>
  <label
    htmlFor="description"
    className="block text-sm font-medium leading-6 text-gray-900"
  >
    Description
  </label>
  <div className="mt-2">
    <textarea
      id="description"
      name="description"
      rows={4}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      defaultValue={''}
    />
  </div>
</div>
<div>
  <h3 className="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
  <div className="mt-2">
    <div className="flex space-x-2">
      {team.map((person) => (
        <a
          key={person.email}
          href={person.href}
          className="relative rounded-full hover:opacity-75"
        >
          <img
            className="inline-block h-8 w-8 rounded-full"
            src={person.imageUrl}
            alt={person.name}
          />
        </a>
      ))}
      <button
        type="button"
        className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="absolute -inset-2" />
        <span className="sr-only">Add team member</span>
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </div>
</div>
<fieldset>
  <legend className="text-sm font-medium leading-6 text-gray-900">Privacy</legend>
  <div className="mt-2 space-y-4">
    <div className="relative flex items-start">
      <div className="absolute flex h-6 items-center">
        <input
          id="privacy-public"
          name="privacy"
          aria-describedby="privacy-public-description"
          type="radio"
          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          defaultChecked
        />
      </div>
      <div className="pl-7 text-sm leading-6">
        <label htmlFor="privacy-public" className="font-medium text-gray-900">
          Public access
        </label>
        <p id="privacy-public-description" className="text-gray-500">
          Everyone with the link will see this project.
        </p>
      </div>
    </div>
    <div>
      <div className="relative flex items-start">
        <div className="absolute flex h-6 items-center">
          <input
            id="privacy-private-to-project"
            name="privacy"
            aria-describedby="privacy-private-to-project-description"
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="pl-7 text-sm leading-6">
          <label htmlFor="privacy-private-to-project" className="font-medium text-gray-900">
            Private to project members
          </label>
          <p id="privacy-private-to-project-description" className="text-gray-500">
            Only members of this project would be able to access.
          </p>
        </div>
      </div>
    </div>
    <div>
      <div className="relative flex items-start">
        <div className="absolute flex h-6 items-center">
          <input
            id="privacy-private"
            name="privacy"
            aria-describedby="privacy-private-to-project-description"
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="pl-7 text-sm leading-6">
          <label htmlFor="privacy-private" className="font-medium text-gray-900">
            Private to you
          </label>
          <p id="privacy-private-description" className="text-gray-500">
            You are the only one able to access this project.
          </p>
        </div>
      </div>
    </div>
  </div>
</fieldset> */}