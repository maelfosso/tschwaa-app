"use client";

import { useQueryString } from "@/lib/hooks";
import { classNames } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CashInConfiguration from "./setup/CashInConfiguration";
import CashOutConfiguration from "./setup/CashOutConfiguration";
import MeetingConfiguration from "./setup/MeetingConfiguration";
import MeetingFrequencies from "./setup/MeetingFrequencies";
import MeetingPoints from "./setup/MeetingPoints";
import MembersSelection from "./setup/MembersSelection";

interface Props {
  organizationId: number;
  sessionId: number;
}

const SetupSession = ({ organizationId, sessionId }: Props) => {
  const { data: authSession } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [step, setStep] = useState(1);

  const { createQueryString } = useQueryString();

  useEffect(() => {
    if (searchParams.has('step')) {
      setStep(+searchParams.get('step')!)
    } else {
      router.push(pathname + '?' + createQueryString('step', '1'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])


  const handleNextClick = () => {
    if (step < 5) {
      router.push(pathname + '?' + createQueryString('step', (step + 1).toString()))
    }
  }

  const handlePreviousClick = () => {
    if (step > 1) {

      router.push(pathname + '?' + createQueryString('step', (step - 1).toString()))
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <MembersSelection organizationId={organizationId} sessionId={sessionId} />
      case 2:
        return <MeetingFrequencies organizationId={organizationId} />
      case 3:
        return <MeetingPoints organizationId={organizationId} />
      case 4:
        return <CashInConfiguration organizationId={organizationId} />
      case 5:
        return <CashOutConfiguration organizationId={organizationId} />
      default:
        <></>
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex flex-wrap items-end gap-6 sm:flex-nowrap">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Setup the new session
          </h1>
          <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
            <a
              href="#"
              className={classNames(step === 1 ? "text-indigo-600" : "text-gray-700")}
            >
              Members
            </a>
            <a
              href="#"
              className={classNames(step === 2 ? "text-indigo-600" : "text-gray-700")}
            >
              Meeting Frequencies
            </a>
            <a
              href="#"
              className={classNames(step === 3 ? "text-indigo-600" : "text-gray-700")}
            >
              Meeting Points
            </a>
            <a
              href="#"
              className={classNames(step === 4 ? "text-indigo-600" : "text-gray-700")}
            >
              Cash In
            </a>
            <a
              href="#"
              className={classNames(step === 5 ? "text-indigo-600" : "text-gray-700")}
            >
              Cash Out
            </a>
          </div>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0"></div>
      </div>
      { renderStep() }
      <div className="flex items-center justify-between mt-auto">
        <button
          className={classNames(
            step == 1 ? "hidden": ""
          )}
          onClick={() => handlePreviousClick()}
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
  )
}

export default SetupSession;
