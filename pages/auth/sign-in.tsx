import { LockClosedIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import type { NextPage } from "next";
import { getCsrfToken, signIn } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { SignInInputs } from '../../utils/types';

const SignIn: NextPage = (): JSX.Element => {
  const [inputs, setInputs] = useState<SignInInputs>({
    username: '',
    password: ''
  });
  const [error, setSubmissionError] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn('auth-signin', {
        ...inputs,
        redirect: false
      });
      console.log(res);
      if (res?.ok) {
        const { callbackUrl } = Router.query;
        Router.replace(callbackUrl ? callbackUrl as string : { pathname: '/orgs'});
      } else {
        // there is an error
        setShowError(true);
        setSubmissionError(res?.error)
      }
    } catch (error ) {
      console.log('sign-in-tsx - ', error);
    }
  }

  const onCloseError = () => {
    setShowError(false);
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className='mt-6 text-center text-3xl tracking-tight font-bold text-gray-900'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link href="/auth/sign-up">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                create an account
              </a>
            </Link>
            {' '} if you don't have one
          </p>
        </div>
        <form className="mt-8 space-y-6" method="POST" onSubmit={onSubmit}>
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
            </div>
          </div> }
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Email / Phone
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="email"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, username: e.target.value})}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder="Email address or Phone number"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, password: e.target.value})}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden="true"/>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
