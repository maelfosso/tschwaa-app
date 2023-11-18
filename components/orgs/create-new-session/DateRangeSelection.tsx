import { Fragment, useEffect, useState } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import { useSelectedLayoutSegment } from "next/navigation"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
}

interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
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
    isToday: d.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
    isSelected: false,
  }))

  let day = (dates[0].getDay() - 1).mod(7)
  if (day > 0 ) {
    for (let i=1; i <= day; i++) {
      calendarDates.unshift({
        date: new Date(Date.UTC(year, month - 1, new Date(year, month, 0).getDate() - i + 1)).toISOString().split('T')[0],
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      })
    }
  }

  day = (dates[dates.length - 1].getDay() - 1).mod(7)
  if (day < 6) {
    for (let i=1; i < 7- day ; i++) {
      calendarDates.push({
        date: new Date(Date.UTC(year, month + 1, i)).toISOString().split('T')[0],
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      })
    }
  }

  if (calendarDates.length < 42) {
    for (let i=0; i < 7 ; i++) {
      calendarDates.push({
        date: new Date(Date.UTC(year, month + 1, 7 - day + i)).toISOString().split('T')[0],
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      })
    }
  }

  return calendarDates;
}

const MONTHS = [
  'January', 'Frebruary', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const DateRangeSelection = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [months, setMonths] = useState<CalendarMonth[]>([])
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    let allMonths: CalendarMonth[] = [];

    for (let i=0; i<12; i++) {
      let datesOfMonth = getAllDatesInMonthUTC(year, i);
      allMonths = [
        ...allMonths,
        {
          name: MONTHS[i],
          days: datesOfMonth
        }
      ]
    }

    if (startDate) {
      allMonths = selectDay(startDate, allMonths);
    }
    if (endDate) {
      allMonths = selectDay(endDate, allMonths);
    }

    setMonths(allMonths);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  useEffect(() => {
    let newMonths = [...months];
    console.log("dates", startDate, endDate);
    if (startDate) {
      newMonths = selectDay(startDate, newMonths);
    } else {
      newMonths = newMonths.map(month => ({
        ...month,
        days: month.days.map(day => {
          if (day.date !== endDate) {
            return {
              ...day,
              isSelected: false
            }
          } else {
            return day;
          }
        })
      }))
    }
    if (endDate) {
      newMonths = selectDay(endDate, newMonths);
    } else {
      newMonths = newMonths.map(month => ({
        ...month,
        days: month.days.map(day => {
          if (day.date !== startDate) {
            return {
              ...day,
              isSelected: false
            }
          } else {
            return day;
          }
        })
      }))
    }

    if (newMonths.length > 0) {
      setMonths(newMonths);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])


  const deselectDay = (d:string, _months: CalendarMonth[] = []) => {
    let newMonths = _months.length > 0 ? [..._months] : [...months];
    
    const _date = new Date(d);
    const monthIdx = _date.getMonth();
    const dayIdx = newMonths[monthIdx].days.findIndex(day => day.date === d);
    if (dayIdx === -1) {
      return newMonths;
    }

    const day = newMonths[monthIdx].days[dayIdx];

    newMonths = [
      ...newMonths.slice(0, monthIdx),
      {
        ...newMonths[monthIdx],
        days: [
          ...newMonths[monthIdx].days.slice(0, dayIdx),
          {
            ...day,
            isSelected: false
          },
          ...newMonths[monthIdx].days.slice(dayIdx + 1)
        ]
      },
      ...newMonths.slice(monthIdx + 1)
    ]

    return newMonths;
  }

  const selectDay = (d:string, _months: CalendarMonth[] = []) => {
    let newMonths = _months.length > 0 ? [..._months] : [...months];

    const _date = new Date(d);
    const monthIdx = _date.getMonth();
    const dayIdx = newMonths[monthIdx].days.findIndex(day => new Date(day.date).getTime() === new Date(d).getTime());
    if (dayIdx === -1) {
      return newMonths;
    }

    const day = newMonths[monthIdx].days[dayIdx];

    newMonths = [
      ...newMonths.slice(0, monthIdx),
      {
        ...newMonths[monthIdx],
        days: [
          ...newMonths[monthIdx].days.slice(0, dayIdx),
          {
            ...day,
            isSelected: true
          },
          ...newMonths[monthIdx].days.slice(dayIdx + 1)
        ]
      },
      ...newMonths.slice(monthIdx + 1)
    ]

    return newMonths;
  }

  const handleNextYearClick = () => setYear(year + 1);
  
  const handlePreviousYearClick = () => setYear(year - 1);

  const handleDayClick = (monthIdx:number, dayIdx: number) => {
    console.log("handle day click", monthIdx, dayIdx);
    let newMonths: CalendarMonth[] = [];
    if (startDate) {
      newMonths = deselectDay(startDate, newMonths);
    }
    if (endDate) {
      newMonths = deselectDay(endDate, newMonths.length ? newMonths : []);
    }

    const day = months[monthIdx].days[dayIdx];
    console.log("handle day click", day);

    if (!startDate) {
      setStartDate(day.date)
    } else {
      if (endDate) {
        if (new Date(day.date) < new Date(endDate)) {
          setStartDate(day.date)
        } else {
          setEndDate(day.date)
        }
      } else {
        setEndDate(day.date);
      }
    }

    if (newMonths.length > 0) setMonths(newMonths);
  }

  return (
    <>
      <div className="pt-3">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">Start and End of the session</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Kindly select, using the calendar, the start and end date of the session
        </p>
      </div>
      <div className="flex flex-none items-center justify-between py-4">
        <div>
          <h3 className="flex items-center gap-1 text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01-22" className="sm:hidden">
              {/* Saturday, Jan 22, 2022 */}
              { startDate }
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              {/* Saturday, January 22, 2022 */}
              { startDate }
            </time>
            {startDate && 
              <button
                type="button"
                className="group relative h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                onClick={() => setStartDate("")}
              >
                <span className="sr-only">Remove</span>
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                  <path d="M4 4l6 6m0-6l-6 6" />
                </svg>
                <span className="absolute -inset-1" />
              </button>
            }
          </h3>
          <p className="mt-1 text-sm text-gray-500">From</p>
        </div>
        <div>
          <h3 className="flex items-center gap-1 text-base font-semibold leading-6 text-gray-900">
            {endDate &&
              <button
                type="button"
                className="group relative h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                onClick={() => setEndDate("")}
              >
                <span className="sr-only">Remove</span>
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                  <path d="M4 4l6 6m0-6l-6 6" />
                </svg>
                <span className="absolute -inset-1" />
              </button>
            }
            <time dateTime="2022-01-22" className="sm:hidden">
              {/* Saturday, Jan 22, 2022 */}
              { endDate }
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              {/* Saturday, January 22, 2022 */}
              { endDate }
            </time>
          </h3>
          <p className="mt-1 text-sm text-right text-gray-500">To</p>
        </div>
      </div>
      <div className="flex-1 rounded-lg border border-gray-200 overflow-y-auto bg-gray-50">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime={year.toString()}>{year}</time>
          </h3>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                onClick={() => handlePreviousYearClick()}
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
                onClick={() => handleNextYearClick()}
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
        </div>
        <div className="bg-white h-full overflow-y-auto">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
            {months.map((month, monthIdx) => (
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
                        day.isCurrentMonth ?
                          `${
                            day.isSelected 
                            ? 'bg-[#795548] text-white'
                            : (new Date(startDate) < new Date(day.date) && new Date(day.date) < new Date(endDate))
                              ? `bg-[#D7CCC8] text-black`
                              : 'bg-white text-gray-900'
                          }`
                          : 'bg-gray-50 text-gray-400',
                        dayIdx === 0 && 'rounded-tl-lg',
                        dayIdx === 6 && 'rounded-tr-lg',
                        dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                        dayIdx === month.days.length - 1 && 'rounded-br-lg',
                        'py-1.5 hover:bg-gray-100 focus:z-10'
                      )}
                      disabled={!day.isCurrentMonth}
                      onClick={() => handleDayClick(monthIdx, dayIdx)}
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
    </>
  )
}

export default DateRangeSelection;

