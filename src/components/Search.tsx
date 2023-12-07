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
    <div className='flex flex-col gap-8 text-center items-center bg-gradient-to-r from-system-manila-dark to-system-manila h-screen w-1/3 p-1'>
      <form
        className='inline-flex flex-col gap-8'
        id='search-form'
        name='search-form'
        onSubmit={onSubmit}
      >
        <label htmlFor='search-form'>Search for a Country</label>
        <input
          form='search-form'
          name='search-input'
          placeholder='e.g. Brazil'
          type='text'
        ></input>
      </form>
      <button className='' onClick={onReset}>
        Reset
      </button>
    </div>
  )
}
