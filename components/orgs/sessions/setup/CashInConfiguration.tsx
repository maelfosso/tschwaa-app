import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import NewCashIn from "./NewCashIn";

interface Props {
  organizationId: number;
}

const CashInConfiguration = ({ organizationId }: Props) => {
  const [openNewCashIn, setOpenNewCashIn] = useState(false);

  return (
    <>
      <div className="mb-8 pt-3 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">Cash In</h2>
          <p className="mt-2 text-base text-gray-700">
            Everything making the money comes in
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpenNewCashIn(true)}
          >
            <PlusIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
            New cash in
          </button>
        </div>
      </div>

      <NewCashIn
        organizationId={organizationId}
        open={openNewCashIn}
        onClose={() => setOpenNewCashIn(false)}
      />
    </>
  )
}

export default CashInConfiguration;
