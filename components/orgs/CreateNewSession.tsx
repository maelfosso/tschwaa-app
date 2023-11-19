import { Fragment, useEffect, useState } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import DateRangeSelection from "./create-new-session/DateRangeSelection"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryString } from "@/lib/hooks";
import { MembersSelection } from "./create-new-session/MembersSelection";

interface CreateNewSessionProps {
  organizationId: number
}

const CreateNewSession = ({ organizationId }: CreateNewSessionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const { createQueryString } = useQueryString();

  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<number>(0)

  useEffect(() => {
    if (searchParams.has('step')) {
      setStep(+searchParams.get('step')!)
    } else {
      router.push(pathname + '?' + createQueryString('step', '1'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleNextClick = () => {
    if (step < 2)
    router.push(pathname + '?' + createQueryString('step', (step + 1).toString()))
  }

  const handlePreviousClick = () => {
    if (step > 1) {
      router.push(pathname + '?' + createQueryString('step', (step - 1).toString()))
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <DateRangeSelection />
      case 2:
        return <MembersSelection organizationId={organizationId} />
      default:
        <></>
    }
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
                  <div className="flex flex-col h-[60vh]">
                    {renderStep()}
                  </div>
                  <div className="flex pt-3">
                    <button
                      className=""
                      onClick={() => handlePreviousClick()}
                      disabled={step <= 1}
                    >
                      Previous
                    </button>
                    <button
                      className="ml-auto"
                      onClick={() => handleNextClick()}
                    >
                      Next
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
