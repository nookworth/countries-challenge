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
  emoji: string
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com',
})

export const App = () => {
  const [emojis, setEmojis] = useState<string[]>([])
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
    const countryName = event.currentTarget.parentElement?.firstChild?.textContent
    const matchingCountry = countriesData.find((country: country) => {
      return country.name === countryName
    })
    const countryCode = matchingCountry?.code
    setCountryCode(countryCode)
    return countryCode
  }

  function onReset() {
    setEmojis([])
    setSearchTerms([])
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // @ts-ignore
    const searchTerm = event.currentTarget.elements['search-input'].value
    const matchingCountry = countriesData?.find((country: country) => {
      return formatSearchTerm(searchTerm) === country.name
    })
    const emoji = matchingCountry?.emoji

    event.preventDefault()

    if (validateSearchTerm(searchTerm)) {
      setSearchTerms([...searchTerms, formatSearchTerm(searchTerm)])
      setEmojis([...emojis, emoji])
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
    <main>
      <div className=''>
        <Search
          countries={countriesData}
          onReset={onReset}
          onSubmit={onSubmit}
        />
        <div className='flex flex-row'>
          <List
            onClick={onClickCountry}
            emojis={emojis}
            searchTerms={searchTerms}
          />
          <Popover countryCode={countryCode} />
        </div>
      </div>
    </main>
  )
}
