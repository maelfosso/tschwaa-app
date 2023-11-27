"use client";

import { classNames } from "@/lib/utils";
import { getOrganizationMembers } from "@/services/organizations";
import { MemberContribution, OrganizationMember } from "@/types/models";
import { Dialog, Listbox, RadioGroup, Switch, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, LinkIcon, PlusIcon, QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
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

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
]

const settings = [
  { name: 'Fix', description: 'Meme montant pour tout le monde (Solidarite, Mariage, Deces, etc...)' },
  { name: 'Variable', description: 'Montant different pour chaque membre (Tontine, etc...)' }
]

const NewCashOut = ({ organizationId , open, onClose }: Props) => {
  const { data: authSession } = useSession();
  const [enabled, setEnabled] = useState(false)
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [concernedMembers, setConcernedMembers] = useState<OrganizationMember[]>([]);
  const [membersContribution, setMembersContribution] = useState<MemberContribution[]>([]);

  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const [selectedCashIn, setSelectedCashIn] = useState(people[3])
  const [kindOfAmountToOut, setKindOfAmountToOut] = useState(settings[0])

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
                            New Cash out
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
                              <Listbox value={selectedCashIn} onChange={setSelectedCashIn}>
                                {({ open }) => (
                                  <>
                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label>
                                    <div className="relative mt-2">
                                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <span className="block truncate">{selectedCashIn.name}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                      </Listbox.Button>

                                      <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                      >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                          {people.map((person) => (
                                            <Listbox.Option
                                              key={person.id}
                                              className={({ active }) =>
                                                classNames(
                                                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                              }
                                              value={person}
                                            >
                                              {({ selected, active }) => (
                                                <>
                                                  <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                    {person.name}
                                                  </span>

                                                  {selected ? (
                                                    <span
                                                      className={classNames(
                                                        active ? 'text-white' : 'text-indigo-600',
                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                      )}
                                                    >
                                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                  ) : null}
                                                </>
                                              )}
                                            </Listbox.Option>
                                          ))}
                                        </Listbox.Options>
                                      </Transition>
                                    </div>
                                  </>
                                )}
                              </Listbox>
                            </div>
                            <div>
                              <RadioGroup value={kindOfAmountToOut} onChange={setKindOfAmountToOut}>
                                <RadioGroup.Label className="">Type de montant a decaisser (Si la caisse est une caisse a cotisation fixe alors, c'est fixe sinon c'est variable)</RadioGroup.Label>
                                <div className="-space-y-px rounded-md bg-white">
                                  {settings.map((setting, settingIdx) => (
                                    <RadioGroup.Option
                                      key={setting.name}
                                      value={setting}
                                      className={({ checked }) =>
                                        classNames(
                                          settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                          settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                          checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
                                          'relative flex cursor-pointer border p-4 focus:outline-none'
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                              active ? 'ring-2 ring-offset-2 ring-indigo-600' : '',
                                              'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                                            )}
                                            aria-hidden="true"
                                          >
                                            <span className="rounded-full bg-white w-1.5 h-1.5" />
                                          </span>
                                          <span className="ml-3 flex flex-col">
                                            <RadioGroup.Label
                                              as="span"
                                              className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                                            >
                                              {setting.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                              as="span"
                                              className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                                            >
                                              {setting.description}
                                            </RadioGroup.Description>
                                          </span>
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Montant a decaisser (dependant de la caisse)
                              </label>
                              <div className="mt-2">
                                <input
                                  type="number"
                                  name="project-name"
                                  id="project-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <RadioGroup value={kindOfAmountToOut} onChange={setKindOfAmountToOut}>
                                <RadioGroup.Label className="">Quand decaissez ? Evenement (deces, naissance, etc...) - Repas ou Tontine</RadioGroup.Label>
                                <div className="-space-y-px rounded-md bg-white">
                                  {settings.map((setting, settingIdx) => (
                                    <RadioGroup.Option
                                      key={setting.name}
                                      value={setting}
                                      className={({ checked }) =>
                                        classNames(
                                          settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                          settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                          checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
                                          'relative flex cursor-pointer border p-4 focus:outline-none'
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                              active ? 'ring-2 ring-offset-2 ring-indigo-600' : '',
                                              'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                                            )}
                                            aria-hidden="true"
                                          >
                                            <span className="rounded-full bg-white w-1.5 h-1.5" />
                                          </span>
                                          <span className="ml-3 flex flex-col">
                                            <RadioGroup.Label
                                              as="span"
                                              className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                                            >
                                              {setting.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                              as="span"
                                              className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                                            >
                                              {setting.description}
                                            </RadioGroup.Description>
                                          </span>
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                            <div>
                              <div
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Planification du decaissement au niveau des membres
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
                              <RadioGroup value={kindOfAmountToOut} onChange={setKindOfAmountToOut}>
                                <RadioGroup.Label className="">Le decaissement en destination d'un membre, est-il supportable par tous (en cas de solidarite - evenement, sante, deces) ou par certains (pret) ou par lui seul?</RadioGroup.Label>
                                <div className="-space-y-px rounded-md bg-white">
                                  {settings.map((setting, settingIdx) => (
                                    <RadioGroup.Option
                                      key={setting.name}
                                      value={setting}
                                      className={({ checked }) =>
                                        classNames(
                                          settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                          settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                          checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
                                          'relative flex cursor-pointer border p-4 focus:outline-none'
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                              active ? 'ring-2 ring-offset-2 ring-indigo-600' : '',
                                              'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                                            )}
                                            aria-hidden="true"
                                          >
                                            <span className="rounded-full bg-white w-1.5 h-1.5" />
                                          </span>
                                          <span className="ml-3 flex flex-col">
                                            <RadioGroup.Label
                                              as="span"
                                              className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                                            >
                                              {setting.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                              as="span"
                                              className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                                            >
                                              {setting.description}
                                            </RadioGroup.Description>
                                          </span>
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                            <div>
                              <RadioGroup value={kindOfAmountToOut} onChange={setKindOfAmountToOut}>
                                <RadioGroup.Label className="">Remboursable? Si c'est une sortie de type tontine lié à la tontine, elle n'est pas remboursable automatiquement, si c'est une sortie de type emprunt elle est remboursable par celui le bénéficiaire de la sortie. Le remboursement se fait par ceux qui ont supporté.</RadioGroup.Label>
                                <div className="-space-y-px rounded-md bg-white">
                                  {settings.map((setting, settingIdx) => (
                                    <RadioGroup.Option
                                      key={setting.name}
                                      value={setting}
                                      className={({ checked }) =>
                                        classNames(
                                          settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                          settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                          checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
                                          'relative flex cursor-pointer border p-4 focus:outline-none'
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                              active ? 'ring-2 ring-offset-2 ring-indigo-600' : '',
                                              'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                                            )}
                                            aria-hidden="true"
                                          >
                                            <span className="rounded-full bg-white w-1.5 h-1.5" />
                                          </span>
                                          <span className="ml-3 flex flex-col">
                                            <RadioGroup.Label
                                              as="span"
                                              className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                                            >
                                              {setting.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                              as="span"
                                              className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                                            >
                                              {setting.description}
                                            </RadioGroup.Description>
                                          </span>
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                            <div>
                              <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                                Raison de l'emprunt
                              </label>
                              <div className="mt-2">
                                <textarea
                                  rows={4}
                                  name="comment"
                                  id="comment"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  defaultValue={''}
                                />
                              </div>
                            </div>                    
                            <div>
                              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Taux de remboursement
                              </label>
                              <div className="relative mt-2 rounded-md shadow-sm">
                                {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500 sm:text-sm">$</span>
                                </div> */}
                                <input
                                  type="text"
                                  name="price"
                                  id="price"
                                  className="block w-full rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            
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

export default NewCashOut;
