"use client";

import { XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import type { NextPage } from "next";
import Link from 'next/link';
import Router from "next/router";
import React, { useState } from 'react';
import { getErrorMessage } from "../../helpers/error";
import { signUp } from "../../services/auth";
import { AUTH_SIGN_IN } from "../../utils/constants";
import { SignUpInputs } from "../../types/requests";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [inputs, setInputs] = useState<SignUpInputs>({
    firstName: '',
    lastName: '',
    sex: 'male',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setSubmissionError] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signUp(inputs);
      router.replace(AUTH_SIGN_IN);
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
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
        <h2 className='mt-6 text-3xl tracking-tight font-bold text-gray-900'>
            Create an account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link href="/auth/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign into your an account
            </Link>
            {' '} if you already have one
          </p>
          {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
        </div>

        <form  action="#" method="POST" onSubmit={onSubmit}
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    value={inputs.firstName}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, firstName: e.target.value})}
                    id="first-name"
                    autoComplete="given-name"
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
                    type="text"
                    name="last-name"
                    value={inputs.lastName}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, lastName: e.target.value})}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, email: e.target.value})}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    required
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInputs({...inputs, sex: e.target.value})}
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

          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
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
