import { classNames } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

const meetingPoints = [
  { name: 'Online', description: 'This project would be available to anyone who has the link' },
  { name: 'Given venue', description: 'Only members of this project would be able to access' },
  { name: 'Member\'s house', description: 'You are the only one able to access this project' },
]

const meetingFrequencies = [
  { id: 'day', name: 'Every day', description: 'A given time hour of the day.' },
  { id: 'week', name: 'Every week', description: 'Once a week.' },
  { id: 'month', name: 'Every month', description: 'Once a month.' },
]

const arrayRange = (start: number, stop: number, step: number) => Array.from(
  { length: (stop - start) / step + 1 },
  (value, index) => start + index * step
);

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const MeetingFrequencyDay = () => {

  return (
    <div className="flex flex-col">
      Starting at
      <input type="time" id="from" name="from" min="00:00" max="24:00" required />
    </div>
  )
}

const MeetingFrequencyWeek = () => {

  return (
    <div>
      <div>
        day
        <select>
          {days.map((d, ix) => <option key={d} value={ix}>{d}</option>)}
        </select>
      </div>
      <div>
        at
        <input type="time" id="from" name="from" min="00:00" max="24:00" required />
      </div>
    </div>
  )
}

const MeetingFrequencyMonth = () => {

  const [choice, setChoice] = useState<string>('');

  return (
    <div className="flex flex-col">
      <div className="">
        <p className="text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-x-3">
            <input
              id="specific-day"
              name="every-month"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={choice === "specific-day"}
              onChange={() => setChoice('specific-day')}
            />
            <label htmlFor="specific-day" className="block text-sm font-medium leading-6 text-gray-900">
              A specific day of the month
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="specific-weekday"
              name="every-month"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={choice === "specific-weekday"}
              onChange={() => setChoice('specific-weekday')}
            />
            <label htmlFor="specific-weekday" className="block text-sm font-medium leading-6 text-gray-900">
              Every specific weekday of the month
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className={classNames(
          choice === "specific-day" ? "hidden" : ""
        )}>
          <div>
            which day
            <select>
              {}
            </select>
          </div>
          <div>
            at
            <input type="time" id="from" name="from" min="00:00" max="24:00" required />
          </div>
        </div>
        <div className={classNames(
          choice === "specific-month" ? "hidden" : ""
        )}>
          <div>every 3rd sunday of the month</div>
          <div>
            at
            <input type="time" id="from" name="from" min="00:00" max="24:00" required />
          </div>
        </div>

      </div>
    </div>
  )
}

interface Props {
  organizationId: number;
}
const MeetingConfiguration = ({ organizationId }: Props) => {

  const [meetingPoint, setMeetingPoint] = useState(meetingPoints[0]);
  const [meetingFrequency, setMeetingFrequency] = useState(meetingFrequencies[0]);

  const renderFrequencyForm = () => {
    switch (meetingFrequency.id) {
      case "day":
        return <MeetingFrequencyDay />
      case "week":
        return <MeetingFrequencyWeek />
      case "month":
        return <MeetingFrequencyMonth />
      default:
        return <></>
    }
  }

  return (
    <div className="pt-3">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">Meeting</h1>
          <p className="mt-2 text-sm text-gray-700">
            Where? When? Period?
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => console.log('save the configuration')}
          >
            Save
          </button>
        </div>
      </div>
      <div className="mt-8 space-y-6 flow-root">
        <RadioGroup value={meetingPoint} onChange={setMeetingPoint}>
          <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">Where do you meet?</RadioGroup.Label>

          <div className="isolate mt-2 -space-y-px rounded-md bg-white shadow-sm">
            {meetingPoints.map((setting, settingIdx) => (
              <RadioGroup.Option
                key={setting.name}
                value={setting}
                className={({ checked }) =>
                  classNames(
                    settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                    settingIdx === meetingPoints.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                    checked ? 'z-10 border-sky-200 bg-sky-50' : 'border-gray-200',
                    'relative flex cursor-pointer border p-4 focus:outline-none'
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={classNames(
                        checked ? 'bg-sky-600 border-transparent' : 'bg-white border-gray-300',
                        active ? 'ring-2 ring-offset-2 ring-sky-500' : '',
                        'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <span className="ml-3 flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          checked ? 'text-sky-900' : 'text-gray-900',
                          'block text-sm font-medium'
                        )}
                      >
                        {setting.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={classNames(checked ? 'text-sky-700' : 'text-gray-500', 'block text-sm')}
                      >
                        {setting.description}
                      </RadioGroup.Description>
                    </span>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        {/* <div className="flex space-x-3"> */}
          <RadioGroup value={meetingFrequency} onChange={setMeetingFrequency}>
            <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">A which frequency do you meet?</RadioGroup.Label>

            <div className="flex space-x-3 mt-2">
              <div className={classNames(
                meetingFrequency ? 'w-2/3' : 'w-full',
                "isolate -space-y-px rounded-md bg-white shadow-sm"
              )}>
                {meetingFrequencies.map((setting, settingIdx) => (
                  <RadioGroup.Option
                    key={setting.name}
                    value={setting}
                    className={({ checked }) =>
                      classNames(
                        settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                        settingIdx === meetingFrequencies.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                        checked ? 'z-10 border-sky-200 bg-sky-50' : 'border-gray-200',
                        'relative flex cursor-pointer border p-4 focus:outline-none'
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <span
                          className={classNames(
                            checked ? 'bg-sky-600 border-transparent' : 'bg-white border-gray-300',
                            active ? 'ring-2 ring-offset-2 ring-sky-500' : '',
                            'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                          )}
                          aria-hidden="true"
                        >
                          <span className="rounded-full bg-white w-1.5 h-1.5" />
                        </span>
                        <span className="ml-3 flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className={classNames(
                              checked ? 'text-sky-900' : 'text-gray-900',
                              'block text-sm font-medium'
                            )}
                          >
                            {setting.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={classNames(checked ? 'text-sky-700' : 'text-gray-500', 'block text-sm')}
                          >
                            {setting.description}
                          </RadioGroup.Description>
                        </span>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
              <div
                className={classNames(
                  meetingFrequency ? 'w-1/3' : 'hidden'
                )}
              >
                { renderFrequencyForm() }
              </div>
            </div>
          </RadioGroup>
        {/* </div> */}
      </div>
    </div>
  )
}

export default MeetingConfiguration;
