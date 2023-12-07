import { useGetCountryDetails } from '../hooks'

interface PopoverProps {
  countryCode: string
}

export const Popover = ({ countryCode }: PopoverProps) => {
  const {
    data: countryDetails,
    loading,
    error,
  } = useGetCountryDetails(countryCode)
  if (error) console.log(error)
  return (
    <div
      className='bg-system-manila-dark w-1/3'
      id='details-popover'
      // @ts-ignore
      popover='true'
    >
      {/* {countryDetails.map((detail: string, index: number) => {
        <div key={index}>
          <p>{detail}</p>
        </div>
      })} */}
      {countryDetails?.country?.capital}
    </div>
  )
}
