"use client";

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import type { NextPage } from 'next'
import { Dialog } from '@headlessui/react';
import { UnauthenticatedNavbar } from './navbar';

const Home: NextPage = () => {
  return (
    <UnauthenticatedNavbar />
  );
}

export default Home
