import { XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import type { NextPage } from "next";
import Link from 'next/link';
import Router from "next/router";
import React, { useState } from 'react';
import { getErrorMessage } from "../../helpers/error";
import { signUp } from "../../services/auth";
import { AUTH_SIGN_IN, AUTH_SIGN_UP } from "../../utils/constants";
import { SignUpInputs } from "../../utils/types";

const SignUp: NextPage = () => {
  const [inputs, setInputs] = useState<SignUpInputs>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setSubmissionError] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signUp(inputs);
      Router.replace(AUTH_SIGN_IN);
    } catch (error) {
      console.log('on submit : ', error);
      setShowError(true);
      setSubmissionError(getErrorMessage(error))
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
            Create an account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link href="/auth/sign-in">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign into your an account
              </a>
            </Link>
            {' '} if you already have one
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={onSubmit}>
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
              <label htmlFor="firstname" className="sr-only">
                Firstname
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                autoComplete="firstname"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, firstname: e.target.value})}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder="Firstname"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="sr-only">
                Lastname
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                autoComplete="lastname"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, lastname: e.target.value})}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder="Lastname"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, email: e.target.value})}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="phone"
                autoComplete="phone"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, phone: e.target.value})}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder="Phone number"
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

          <div>
            <button
              type="submit"
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
