import { Fragment, useEffect, useState } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CreateNewSession = () => {
  const [open, setOpen] = useState(true)

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
                <CreateNewSessionContent />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CreateNewSession;

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
}

const months = [
  {
    name: 'January',
    days: [
      { date: '2021-12-27' },
      { date: '2021-12-28' },
      { date: '2021-12-29' },
      { date: '2021-12-30' },
      { date: '2021-12-31' },
      { date: '2022-01-01', isCurrentMonth: true },
      { date: '2022-01-02', isCurrentMonth: true },
      { date: '2022-01-03', isCurrentMonth: true },
      { date: '2022-01-04', isCurrentMonth: true },
      { date: '2022-01-05', isCurrentMonth: true },
      { date: '2022-01-06', isCurrentMonth: true },
      { date: '2022-01-07', isCurrentMonth: true },
      { date: '2022-01-08', isCurrentMonth: true },
      { date: '2022-01-09', isCurrentMonth: true },
      { date: '2022-01-10', isCurrentMonth: true },
      { date: '2022-01-11', isCurrentMonth: true },
      { date: '2022-01-12', isCurrentMonth: true, isToday: true },
      { date: '2022-01-13', isCurrentMonth: true },
      { date: '2022-01-14', isCurrentMonth: true },
      { date: '2022-01-15', isCurrentMonth: true },
      { date: '2022-01-16', isCurrentMonth: true },
      { date: '2022-01-17', isCurrentMonth: true },
      { date: '2022-01-18', isCurrentMonth: true },
      { date: '2022-01-19', isCurrentMonth: true },
      { date: '2022-01-20', isCurrentMonth: true },
      { date: '2022-01-21', isCurrentMonth: true },
      { date: '2022-01-22', isCurrentMonth: true },
      { date: '2022-01-23', isCurrentMonth: true },
      { date: '2022-01-24', isCurrentMonth: true },
      { date: '2022-01-25', isCurrentMonth: true },
      { date: '2022-01-26', isCurrentMonth: true },
      { date: '2022-01-27', isCurrentMonth: true },
      { date: '2022-01-28', isCurrentMonth: true },
      { date: '2022-01-29', isCurrentMonth: true },
      { date: '2022-01-30', isCurrentMonth: true },
      { date: '2022-01-31', isCurrentMonth: true },
      { date: '2022-02-01' },
      { date: '2022-02-02' },
      { date: '2022-02-03' },
      { date: '2022-02-04' },
      { date: '2022-02-05' },
      { date: '2022-02-06' },
    ],
  },
  // More months...
]

interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface CalendarMonth {
  name: string;
  days: CalendarDay[]
}

const getAllDatesInMonthUTC = (year: number, month: number) => {
  const daysInMonth = new Date(Date.UTC(year, month + 1, 1))
    - new Date(Date.UTC(year, month, 1));
  const dates = Array.from({
      length: daysInMonth / (24 * 60 * 60 * 1000) 
    }, 
    (_, index) => new Date(Date.UTC(year, month, index + 1))
  );
  let calendarDates = dates.map(d => ({
    date: d.toISOString().split('T')[0],
    isCurrentMonth: true,
    isToday: d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
  }))

  console.log(year, month)
  let day = (dates[0].getDay() - 1).mod(7)
  console.log("start ", dates[0].getDay(), day)
  if (day > 0 ) {
    for (let i=1; i <= day; i++) {
      calendarDates.unshift({
        date: new Date(Date.UTC(year, month - 1, new Date(year, month, 0).getDate() - i + 1)).toISOString().split('T')[0],
        isCurrentMonth: false,
        isToday: false
      })
    }
  }

  day = (dates[dates.length - 1].getDay() - 1).mod(7)
  console.log("start ", dates[dates.length - 1].getDay(), day)
  if (day < 6) {
    for (let i=1; i < 7- day ; i++) {
      calendarDates.push({
        date: new Date(Date.UTC(year, month + 1, i)).toISOString().split('T')[0],
        isCurrentMonth: false,
        isToday: false
      })
    }
  }

  if (calendarDates.length < 42) {
    for (let i=0; i < 7 ; i++) {
      calendarDates.push({
        date: new Date(Date.UTC(year, month + 1, 7 - day + i)).toISOString().split('T')[0],
        isCurrentMonth: false,
        isToday: false
      })
    }
  }

  return calendarDates;
}

const MONTHS = [
  'January', 'Frebruary', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const CreateNewSessionContent = () => {
  const [months, setMonths] = useState<CalendarMonth[]>([])
  useEffect(() => {
    const today = new Date();
    const currentYear  = today.getFullYear();
    const currentMonth = today.getMonth();
    let allMonths: CalendarMonth[] = [];

    // let datesInFebruary2023 = getAllDatesInMonthUTC(2023, 1);
    for (let i=0; i<12; i++) {
      let datesOfMonth = getAllDatesInMonthUTC(currentYear, i);
      console.log(currentYear, i);
      console.log(datesOfMonth);
      allMonths = [
        ...allMonths,
        {
          name: MONTHS[i],
          days: datesOfMonth
        }
      ]
    }

    setMonths(allMonths);
  }, []);

  return (
    <div>
      <header className="border-b border-gray-900/10 pb-3">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">Create a new session</h2>
        {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Kindly select, using the calendar, the start and end date of the session
        </p> */}
      </header>
      <div className="pt-3">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">Start and End of the session</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Kindly select, using the calendar, the start and end date of the session
        </p>
      </div>
      <header className="flex flex-none items-center justify-between py-4">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01-22" className="sm:hidden">
              Saturday, Jan 22, 2022
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              Saturday, January 22, 2022
            </time>
          </h3>
          <p className="mt-1 text-sm text-gray-500">From</p>
        </div>
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01-22" className="sm:hidden">
              Saturday, Jan 22, 2022
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              Saturday, January 22, 2022
            </time>
          </h3>
          <p className="mt-1 text-sm text-gray-500">To</p>
        </div>
      </header>
      <div className="rounded-lg border border-gray-200 overflow-y-auto bg-gray-50">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022">2022</time>
          </h3>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              >
                <span className="sr-only">Previous year</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              >
                <span className="sr-only">Next year</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {/* <div className="hidden md:ml-4 md:flex md:items-center">
              <Menu as="div" className="relative">
                <Menu.Button
                  type="button"
                  className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Year view
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Day view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Week view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Month view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Year view
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div className="ml-6 h-6 w-px bg-gray-300" />
              <button
                type="button"
                className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add event
              </button>
            </div>
            <Menu as="div" className="relative ml-6 md:hidden">
              <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Create event
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Go to today
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu> */}
          </div>
        </header>
        <div className="bg-white h-[50vh] overflow-y-auto">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
            {months.map((month) => (
              <section key={month.name} className="text-center">
                <h2 className="text-sm font-semibold text-gray-900">{month.name}</h2>
                <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                  <div>S</div>
                </div>
                <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                  {month.days.map((day, dayIdx) => (
                    <button
                      key={day.date}
                      type="button"
                      className={classNames(
                        day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
                        dayIdx === 0 && 'rounded-tl-lg',
                        dayIdx === 6 && 'rounded-tr-lg',
                        dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                        dayIdx === month.days.length - 1 && 'rounded-br-lg',
                        'py-1.5 hover:bg-gray-100 focus:z-10'
                      )}
                    >
                      <time
                        dateTime={day.date}
                        className={classNames(
                          day.isToday && 'bg-indigo-600 font-semibold text-white',
                          'mx-auto flex h-7 w-7 items-center justify-center rounded-full'
                        )}
                      >
                        {day.date.split('-').pop().replace(/^0/, '')}
                      </time>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <div className="flex pt-3">
        <button className="ml-auto">Next</button>
      </div>
    </div>
  )
}
