import React from 'react'

type SearchOnSubmit = (event: React.FormEvent<HTMLFormElement>) => void

type country = {
  name: string
  code: string
  emoji: string
}
interface SearchProps {
  countries: country[]
  onReset: () => void
  onSubmit: SearchOnSubmit
}

export const Search = ({ countries, onReset, onSubmit }: SearchProps) => {
  return (
    <div className='bg-gradient-to-b from-system-manila-dark to-system-manila w-full py-4'>
      <div className='border-2 border-system-navy rounded-lg flex flex-col gap-8 text-center items-center py-4 w-5/6 mx-auto'>
        <form
          className='inline-flex flex-col gap-8'
          id='search-form'
          name='search-form'
          onSubmit={onSubmit}
        >
          <label htmlFor='search-form' className='text-lg font-bold'>
            Search for a Country
          </label>
          <input
            type='text'
            form='search-form'
            className='outline-system-navy py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
            name='search-input'
            placeholder='e.g. Brazil'
          ></input>
        </form>
        <div className='flex flex-row-reverse gap-4'>
          <button
            type='button'
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-system-navy hover:border-bright-red hover:bg-burgundy hover:text-bright-red transition-all'
            onClick={onReset}
          >
            Go
          </button>
          <button
            type='button'
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-system-navy hover:border-bright-red hover:bg-burgundy hover:text-bright-red transition-all'
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
