import React from 'react'
import { useMemo, useState } from 'react'
import './App.css'
import { Search } from './components/Search'
import { List } from './components/List'
import { Popover } from './components/Popover'
import { useListCountries } from './hooks/'
import { ApolloClient, InMemoryCache } from '@apollo/client'

type country = {
  name: string
  code: string
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com',
})

export const App = () => {
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const [countryCode, setCountryCode] = useState<string>('US')
  const [countryDetails, setCountryDetails] = useState<{}>({})
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  // TODO: loading and error messages
  const { data, loading, error } = useListCountries()
  const countriesData = data?.countries

  // TODO: handle multi-word country names
  function formatSearchTerm(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase()
    const matchingCountry = countriesData?.find((country: country) => {
      return country.name.toLowerCase() === lowerCaseSearchTerm
    })
    return matchingCountry
      ? matchingCountry.name
      : new Error('Search term is not a valid country name')
  }

  function onClickCountry(event: React.SyntheticEvent) {
    // 1. grab country name from button
    const countryName = event.currentTarget.textContent
    // 2. get corresponding country code
    const countryCode = countriesData.find((country: country) => {
      return country.name === countryName
    }).code
    // update state to trigger Popover rerender
    setCountryCode(countryCode)
  }

  function onReset() {
    setSearchTerms([])
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // @ts-ignore
    const searchTerm = event.currentTarget.elements['search-input'].value

    event.preventDefault()

    if (validateSearchTerm(searchTerm)) {
      setSearchTerms([...searchTerms, formatSearchTerm(searchTerm)])
      // @ts-ignore
      event.currentTarget.elements['search-input'].value = ''
      return
    } else {
      window.alert(
        'Please enter a valid country name that you have not already searched for.'
      )
    }
  }

  // TODO: allow users to search for a list of comma-separated countries
  function validateSearchTerm(searchTerm: string) {
    const isValidCountry = data?.countries.some((country: country) => {
      return searchTerm.trim().match(new RegExp(`\\b${country.name}\\b`, 'i'))
    })
    const hasNotBeenSeareched = !searchTerms.includes(
      formatSearchTerm(searchTerm)
    )
    return isValidCountry && hasNotBeenSeareched
  }

  return (
    <main className='flex flex-row'>
      <Search onSubmit={onSubmit} />
      <List
        onClick={onClickCountry}
        onReset={onReset}
        searchTerms={searchTerms}
      />
      <Popover countryCode={countryCode} />
    </main>
  )
}
