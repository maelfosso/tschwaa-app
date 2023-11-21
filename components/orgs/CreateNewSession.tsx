import { Fragment, useEffect, useRef, useState } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryString } from "@/lib/hooks";
import YearCalendar from "./create-new-session/DateRangeSelection"
import MeetingConfiguration from "./create-new-session/MeetingConfiguration";
import MembersSelection from "./create-new-session/MembersSelection";
import { createNewSession } from "@/services/organizations";
import { useSession } from "next-auth/react";

interface CreateNewSessionProps {
  organizationId: number
}

const CreateNewSession = ({ organizationId }: CreateNewSessionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // const { createQueryString } = useQueryString();

  const [open, setOpen] = useState(true);

  const { data: authSession } = useSession();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   if (searchParams.has('step')) {
  //     setStep(+searchParams.get('step')!)
  //   } else {
  //     router.push(pathname + '?' + createQueryString('step', '1'))
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParams])

  // const handleNextClick = () => {
  //   if (step < 3) {
  //     router.push(pathname + '?' + createQueryString('step', (step + 1).toString()))
  //   }
  // }

  // const handlePreviousClick = () => {
  //   if (step > 1) {

  //     router.push(pathname + '?' + createQueryString('step', (step - 1).toString()))
  //   }
  // }

  // const renderStep = () => {
  //   switch (step) {
  //     case 1:
  //       return <YearCalendar
  //         organizationId={organizationId}
  //         onNext={handleNextClick}
  //         onPrevious={handlePreviousClick}
  //       />
  //     case 2:
  //       return <MembersSelection organizationId={organizationId} />
  //     case 3:
  //       return <MeetingConfiguration organizationId={organizationId} />
  //     default:
  //       <></>
  //   }
  // }

  const isValid = () => {
    console.log('is-valid ', startDate && endDate);
    return startDate && endDate;
  }

  const handleCreateClick = async () => {
    try {
      if (isValid()) {
        const createdSession = await createNewSession(
          organizationId,
          startDate,
          endDate,
          authSession?.accessToken!,
        );

        router.replace(`orgs/${organizationId}/sessions/${createdSession.id}/setup`)
      } else {
        setError("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.name); // the type of error
        console.log(error.message); // the description of the error
        console.log(error.stack); // the stack trace of the error
        setError(error.message);
      } else {
        // handle other errors
      }
    }
  }
  const handleCancelClick = () => {
    router.replace('/orgs');
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog static as="div" className="relative z-10" onClose={setOpen}>
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-xl sm:p-6">
                <div className="flex flex-col">
                  <header className="border-b border-gray-900/10 pb-3">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">Create a new session</h2>
                  </header>
                  <div className="flex flex-col">
                    <p className="mt-3 max-w-2xl text-base leading-6 text-gray-600">
                      Kindly select, using the calendar, the <strong>start and end date</strong> of the session
                    </p>
                    <YearCalendar
                      startDateValue={startDate}
                      onStartDateChange={(d: string) => setStartDate(d)}
                      endDateValue={endDate}
                      onEndDateChange={(d: string) => setEndDate(d)}
                    />
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-[#795548] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => handleCreateClick()}
                    >
                      Create the new session
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => handleCancelClick()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CreateNewSession;
