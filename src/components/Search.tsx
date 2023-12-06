import React from 'react';

export const Search = () =>  {
  return (
    <div className='bg-system-manila-dark h-screen w-1/3'>
      <form>
        <label htmlFor='search-form'>Search</label>
        <input id='search-form' placeholder='Brazil'></input>
      </form>
    </div>
  );
}