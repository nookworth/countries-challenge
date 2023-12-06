import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com',
})

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`

export const useListCountries = () => {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client })
  return useMemo(() => ({ data, loading, error }), [data, loading, error])
}
