import { gql, useQuery } from '@apollo/client'
import { client } from '../App'

const COUNTRY_DETAILS = gql`
  query countryDetails ($code: ID!) {
    country(code: $code) {
      capital
      emoji
      name
    }
  }
`

export const useGetCountryDetails = (countryCode: string) => {
  const { data, loading, error } = useQuery(COUNTRY_DETAILS, {
    client,
    variables: {
      code: countryCode,
    },
  })
  // TODO: is useMemo needed here?
  return { data, loading, error }
}
