import React from 'react'

type SearchOnSubmit = (event: React.FormEvent<HTMLFormElement>) => void

interface SearchProps {
  onSubmit: SearchOnSubmit
}

export const Search = ({ onSubmit }: SearchProps) => {
  return (
    <div className='bg-system-manila h-screen w-1/3'>
      <form id='search-form' name='search-form' onSubmit={onSubmit}>
        <label htmlFor='search-form'>Search for a Country</label>
        <input
          form='search-form'
          name='search-input'
          placeholder='e.g. Brazil'
          type='text'
        ></input>
        {/* <input type='submit'></input> */}
      </form>
    </div>
  )
}
