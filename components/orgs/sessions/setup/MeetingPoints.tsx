"use client";

import { classNames } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

interface Props {
  organizationId: number;
}

const meetingPoints = [
  { name: 'Online', description: 'This project would be available to anyone who has the link' },
  { name: 'Given venue', description: 'Only members of this project would be able to access' },
  { name: 'Member\'s house', description: 'You are the only one able to access this project' },
]

const MeetingPoints = ({ organizationId }: Props) => {

  const [meetingPoint, setMeetingPoint] = useState(meetingPoints[0]);

  return (
    <>
      <div className="mb-8 pt-3 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">Meeting Point</h2>
          <p className="mt-2 text-base text-gray-700">
            Where do you meet? Where do you go for you meeting?
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          
        </div>
      </div>
      <RadioGroup value={meetingPoint} onChange={setMeetingPoint}>
        <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">We meet</RadioGroup.Label>

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
    </>
  )
}

export default MeetingPoints;
