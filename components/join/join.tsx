"use client";

import { getErrorMessage } from "@/helpers/error";
import { Adhesion, Invitation, Member, Organization } from "@/types/models";
import customAxiosInstance from "@/lib/axios";
import { AUTH_SIGN_IN } from "@/lib/constants";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, CheckIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

type Props = {
  // invitation: Invitation;
  link: string;
  active: boolean;
  // adhesion: Adhesion;
  organization: Organization;
  member: Member;
  code?: string;
}

type InputType = Member & { password: string };

const INVITATION_STATUS_S601 = "S601";
const INVITATION_STATUS_S602 = "S602";

const FromNotConnectedButAccounted = ({ link, member, organization, code }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onJoin = async () => {
    try {
      const data = await customAxiosInstance.post(`/join/${link}`, JSON.stringify({ code }));
      setOpen(true);
    } catch (error) {
      console.log('on join : ', error);
    }
  }

  const onCloseModal = () => {
    setOpen(false);
    router.push(AUTH_SIGN_IN);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Join an organization?</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{ `${member.firstName} ${member.lastName}` }, you are about to join the { organization.name } organization</p>
                <br/>
                <p>Are you sure you want to join that organization?</p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    onClick={(e) => onJoin()}
                    type="button"
                    className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    Yes, I want to join it!
                  </button>
                  {/* <button
                    type="button"
                    className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    Dismiss
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Membership granted
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Now, you are a member of the organization {organization.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => onCloseModal()}
                      >
                        Join other members
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  )
}

const FromConnectedAndAccount = ({ link, member, organization, code }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onJoin = async () => {
    try {
      const data = await customAxiosInstance.post(`/join/${link}`, JSON.stringify({ code }));
      setOpen(true);
    } catch (error) {
      console.log('on join : ', error);
    }
  }

  const onCloseModal = () => {
    setOpen(false);
    router.push(`/orgs/${organization.id}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Joined the organization</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{ `${member.firstName} ${member.lastName}` }, you are about to join the { organization.name } organization</p>
                <br/>
                <p>Are you sure you want to join that organization?</p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    onClick={(e) => onJoin()}
                    type="button"
                    className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    Yes, I want to join {organization.name}
                  </button>
                  {/* <button
                    type="button"
                    className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    Dismiss
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>



        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Membership granted
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Now, you are a member of the organization {organization.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => onCloseModal()}
                      >
                        Join other members
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}

const FromNewMember = ({
  link, organization, member
}: Props) => {
  const [inputs, setInputs] = useState<InputType>({
    id: member.id,
    firstName: member.firstName,
    lastName: member.lastName,
    sex: member.sex,
    email: member.email,
    phone: member.phone,
    password: '',
  });
  const [error, setSubmissionError] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const data = await customAxiosInstance.post(`/join/${link}`, JSON.stringify(inputs));
      setOpen(true);
    } catch (error) {
      console.log('on submit : ', error);
      setShowError(true);
      setSubmissionError(getErrorMessage(error))
    }
  }

  const onCloseError = () => {
    setShowError(false);
  }

  const onCloseModal = () => {
    setOpen(false);
    router.push(AUTH_SIGN_IN);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <form action="#" method="POST" onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div className="">
              <h1 className="text-sm font-medium text-indigo-600">Invitation to join</h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Welcome M/Mrs {`${member.firstName ?? ''} ${member.lastName ?? ''}`} </p>
              <p className="mt-2 text-base text-gray-500">
                We thank you for accepting join the organization {organization.name}
              </p>

              { error && showError && <div className='rounded-md bg-red-50 p-4'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm font-medium text-red-800'>{ error }</p>
                  </div>
                  <div className='ml-auto pl-3'>
                    <div className='-mx-1.5 -my-1.5'>
                      <button
                        type='button'
                        className='inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50'
                        onClick={() => onCloseError()}
                      >
                        <span className='sr-only'>Dismiss</span>
                        <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                      </button>
                    </div>
                  </div>
                </div>x
              </div> }
            </div>

            <div className="shadow max-w-2xl sm:overflow-hidden sm:rounded-md md:col-span-2">
              <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8  sm:grid-cols-6">
                  <input type="hidden" name="id" defaultValue={inputs.id} />
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstname"
                        name="firstname"
                        value={inputs.firstName}
                        type="text"
                        autoComplete="firstname"
                        required
                        placeholder="Firstname"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, firstName: e.target.value})}      
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastname"
                        name="lastname"
                        value={inputs.lastName}
                        type="text"
                        autoComplete="lastname"
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, lastName: e.target.value})}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Lastname"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        value={inputs.email}
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, email: e.target.value})}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">
                      Sex
                    </label>
                    <div className="mt-2">
                      <select
                        id="sex"
                        name="sex"
                        value={inputs.sex}
                        autoComplete="sex-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        autoComplete="phone"
                        value={inputs.phone}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, phone: e.target.value})}
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Mot de passe
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={inputs.password}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, password: e.target.value})}
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Your password"
                      />
                    </div>
                  </div>

                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Membership granted
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Now, you are a member of the organization {organization.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => onCloseModal()}
                    >
                      Join other members
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

const Join = (props: Props) => {
  const { code } = props;

  if (code) {
    if (code === INVITATION_STATUS_S601) {
      return (
        <FromConnectedAndAccount {...props} />
      )
    } else if (code === INVITATION_STATUS_S602) {
      return (
        <FromNotConnectedButAccounted {...props} />
      )
    }
  }

  return (
    <FromNewMember
      {...props}
    />
  )
}

export default Join;
