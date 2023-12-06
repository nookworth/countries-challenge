import React from 'react'
import { useMemo, useState } from 'react'
import './App.css'
import { Search } from './components/Search'
import { List } from './components/List'
import { useListCountries } from './useListCountries'

type country = {
  name: string
  code: string
}

function App() {
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  // TODO: loading and error messages
  const { data: countriesData, loading, error } = useListCountries()

  // TODO: handle multi-word country names
  function formatSearchTerm(searchTerm: string) {
    const lowerCase = searchTerm.trim().toLowerCase()
    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
  }

  // TODO: allow users to search for a list of comma-separated countries
  function validateSearchTerm(searchTerm: string) {
    const isValidCountry = countriesData?.countries.some((country: country) => {
      return searchTerm.trim().match(new RegExp(`\\b${country.name}\\b`, 'i'))
    })
    const hasNotBeenSeareched = !searchTerms.includes(formatSearchTerm(searchTerm))
    return isValidCountry && hasNotBeenSeareched
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // @ts-ignore
    const searchTerm = event.currentTarget.elements['search-input'].value

    event.preventDefault()

    validateSearchTerm(searchTerm)
      ? setSearchTerms([...searchTerms, formatSearchTerm(searchTerm)])
      : // TODO: show error message
        window.alert('Please enter a valid country name that you have not already searched for.')
  }

  function onReset() {
    setSearchTerms([])
  }

  return (
    <main className='flex flex-row'>
      <Search onSubmit={onSubmit} />
      <List onReset={onReset} searchTerms={searchTerms} />
      <div>Popover</div>
    </main>
  )
}

export default App
