'use client'; // Error components must be Client components

import { ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

const errorsMessages = {
  ERR_JOIN_606: `
    You are not the member to whom the invitation is addressed.

    If you think the invitation is for you, kindly update your email or your phone number to match the one of this invitation.
    Or ask to the administrator to send the invitation to your phone number.
  `
}

export default function JoinError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error message', error.message);
  }, [error]);

  {/* <h2>Something went wrong! : {error.message}</h2>
  <button
    onClick={
      // Attempt to recover by trying to re-render the segment
      () => reset()
    }
  >
    Try again
  </button> */}
  const errorKey = error.message
  console.log('error key: ', errorKey);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-3xl">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Something went wrong!</h3>
              <div className="mt-2 text-sm text-red-700">
                <div>{ errorsMessages['ERR_JOIN_606'] }</div>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                    onClick={
                      // Attempt to recover by trying to re-render the segment
                      () => reset()
                    }
                  >
                    Try again
                  </button>

                  <button
                    type="button"
                    className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    onClick={
                      () => signOut()
                    }
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
