import Countries from "@/lib/countries"
import React, { useState } from "react"

export const PhoneNumberInput = ({
  onChange,
}: {
  onChange: (value: string) => void
}) => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Cameroon',
    flag: '🇨🇲',
    code: 'CM',
    dialCode: '+237',
    mask: '9 99 99 99 99'
  })
  const [value, setValue] = useState<string>("")

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const newCode = event.target.value;
    setSelectedCountry( Countries.find(c => c.code === newCode)! )
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setValue(event.target.value);
    const newValue = `${selectedCountry.dialCode}${event.target.value}`;
    onChange(newValue);
  }
  return (
    <>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <label htmlFor="country" className="sr-only">
          Country
        </label>
        <select
          id="country"
          name="country"
          autoComplete="country"
          className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          value={selectedCountry.code}
          onChange={handleCountryChange}
        >
          {/* <option>US</option>
          <option>CA</option>
          <option>EU</option> */}
          { Countries.map((country) => <option key={country.code} value={country.code}>{`${country.name} ${country.flag}`}</option>)}
        </select>
      </div>
      <input
        type="text"
        name="phone-number"
        id="phone-number"
        className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={selectedCountry.mask}
        value={value}
        onChange={handleInputChange}
        // onChange={(event) => setMember({...member!, phone: event.target.value})}
      />
    </>
  )
}