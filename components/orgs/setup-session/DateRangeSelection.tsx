import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { classNames } from "@/lib/utils";


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

interface Props {
  startDateValue: string;
  endDateValue: string;
  onStartDateChange: (d: string) => void;
  onEndDateChange: (d: string) => void;
}

const YearCalendar = ({ startDateValue, endDateValue, onStartDateChange, onEndDateChange }: Props) => {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [months, setMonths] = useState<CalendarMonth[]>([])

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

    if (startDateValue) {
      allMonths = selectDay(startDateValue, allMonths);
    }
    if (endDateValue) {
      allMonths = selectDay(endDateValue, allMonths);
    }

    setMonths(allMonths);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  useEffect(() => {
    let newMonths = [...months];
    console.log("dates", startDateValue, endDateValue);
    if (startDateValue) {
      newMonths = selectDay(startDateValue, newMonths);
    } else {
      newMonths = newMonths.map(month => ({
        ...month,
        days: month.days.map(day => {
          if (day.date !== endDateValue) {
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
    if (endDateValue) {
      newMonths = selectDay(endDateValue, newMonths);
    } else {
      newMonths = newMonths.map(month => ({
        ...month,
        days: month.days.map(day => {
          if (day.date !== startDateValue) {
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
  }, [startDateValue, endDateValue]);

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
    let newMonths: CalendarMonth[] = [];
    if (startDateValue) {
      newMonths = deselectDay(startDateValue, newMonths);
    }
    if (endDateValue) {
      newMonths = deselectDay(endDateValue, newMonths.length ? newMonths : []);
    }

    const day = months[monthIdx].days[dayIdx];

    if (!startDateValue && !endDateValue) { // [,]
      onStartDateChange(day.date);
    } else {                      // [s, ] or [, e]
      if (startDateValue) {            // [s, ]
        if (endDateValue) {            // [s, e]
          if (new Date(day.date) <= new Date(startDateValue)) {
            onStartDateChange(day.date)
          } else {
            if (new Date(day.date) < new Date(endDateValue)) {
              onStartDateChange(day.date);
            } else {
              onEndDateChange(day.date);
            }
          }
        } else {                  // [s, ]
          if (new Date(day.date) <= new Date(startDateValue)) {
            onEndDateChange(startDateValue);
            onStartDateChange(day.date);
          } else {
            onEndDateChange(day.date);
          }
        }
      } else {                    // [, e]
        if (startDateValue) {          // [s, e]
          if (new Date(day.date) <= new Date(startDateValue)) {
            onStartDateChange(day.date)
          } else {
            if (new Date(day.date) < new Date(endDateValue)) {
              onStartDateChange(day.date);
            } else {
              onEndDateChange(day.date);
            }
          }
        } else {
          if (new Date(day.date) < new Date(endDateValue)) {
            onStartDateChange(day.date);
          } else {
            onStartDateChange(endDateValue);
            onEndDateChange(day.date);
          }
        }
      }
    }

    if (newMonths.length > 0) setMonths(newMonths);
  }

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex flex-none items-center justify-between py-4">
        <div>
          <h3 className="flex items-center gap-1 text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01-22" className="sm:hidden">
              {/* Saturday, Jan 22, 2022 */}
              { startDateValue }
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              {/* Saturday, January 22, 2022 */}
              { startDateValue }
            </time>
            {startDateValue && 
              <button
                type="button"
                className="group relative h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                onClick={() => onStartDateChange("")}
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
            {endDateValue &&
              <button
                type="button"
                className="group relative h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                onClick={() => onEndDateChange("")}
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
              { endDateValue }
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              {/* Saturday, January 22, 2022 */}
              { endDateValue }
            </time>
          </h3>
          <p className="mt-1 text-sm text-right text-gray-500">To</p>
        </div>
      </div>
      <div className="border border-gray-200 bg-gray-50 rounded-tr-lg rounded-tl-lg flex items-center justify-between border-b border-gray-200 px-6 py-4">
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
        </div>
      </div>
      <div className="border border-t-0 border-gray-200 rounded-br-lg rounded-bl-lg flex-1 w-full overflow-y-auto mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-8 px-4 py-8 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
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
                        : (new Date(startDateValue) < new Date(day.date) && new Date(day.date) < new Date(endDateValue))
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
  )
}

export default YearCalendar;

