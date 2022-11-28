import { Menu, Transition } from "@headlessui/react";
import { Bars4Icon, BriefcaseIcon, CalendarIcon, CheckIcon, ChevronDownIcon, ClockIcon, CurrencyDollarIcon, LinkIcon, MapPinIcon, PencilIcon, PhotoIcon, TableCellsIcon, ViewColumnsIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import Organization from "../../../models/organization";
import customAxiosInstance from "../../../utils/axios";
import { classNames } from "../../../utils/utils";

interface OrgDetailsProps {
  org: Organization
}

const items = [
  {
    title: 'Create a List',
    description: 'Another to-do system you’ll try but eventually give up on.',
    icon: Bars4Icon,
    background: 'bg-pink-500',
  },
  {
    title: 'Create a Calendar',
    description: 'Stay on top of your deadlines, or don’t — it’s up to you.',
    icon: CalendarIcon,
    background: 'bg-yellow-500',
  },
  {
    title: 'Create a Gallery',
    description: 'Great for mood boards and inspiration.',
    icon: PhotoIcon,
    background: 'bg-green-500',
  },
  {
    title: 'Create a Board',
    description: 'Track tasks in different stages of your project.',
    icon: ViewColumnsIcon,
    background: 'bg-blue-500',
  },
  {
    title: 'Create a Spreadsheet',
    description: 'Lots of numbers and things — good for nerds.',
    icon: TableCellsIcon,
    background: 'bg-indigo-500',
  },
  {
    title: 'Create a Timeline',
    description: 'Get a birds-eye-view of your procrastination.',
    icon: ClockIcon,
    background: 'bg-purple-500',
  },
]

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const OrgDetails = ({ org }: OrgDetailsProps) => {
  return (
    <div className="container mx-auto">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
           { org.name }
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Full-time
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Remote
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              $120k &ndash; $140k
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Closing on January 9, 2020
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <button type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              Edit
            </button>
          </span>
          <span className="ml-3 hidden sm:block">
            <button type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              View
            </button>
          </span>
          <span className="sm:ml-3">
            <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Publish
            </button>
          </span>

          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              More
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      View
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div>
        <ul role="list" className="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-2">
          { items.map((item, itemIdx) => (
            <li key={itemIdx} className="flow-root">
              <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                <div
                  className={classNames(
                    item.background,
                    'flex-shrink-0 flex items-center justify-center h-16  w-16 rounded-lg'
                  )}
                >
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps = () => {
  const data = customAxiosInstance.get(`org/1`)
  return {
    props: {
      org: data
    }
  }
}

export default OrgDetails;
  // </div>
  // <div className="flex flex-row min-h-screen justify-center items-center">
  //   <h1>Here are all the organization you are in</h1>
  // </div>
  