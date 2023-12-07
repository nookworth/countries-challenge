import { useGetCountryDetails } from '../hooks'
import './popover.css'

interface PopoverProps {
  countryCode: string
}

type language = {
  name: string
  native: string
}

type subdivision = {
  name: string
}

export const Popover = ({ countryCode }: PopoverProps) => {
  const { data, loading, error } = useGetCountryDetails(countryCode)
  const countryDetails = data?.country
  if (error) console.log(error)
  // TODO: implement dropdown for many subdivisions
  const subdivisions =
    (countryDetails?.states ?? countryDetails?.subdivisions) ?? null

  return (
    <div
      className='w-1/2 left-1/2 max-h-500px'
      id='details-popover'
      // @ts-ignore
      popover='auto'
    >
      {loading ? (
        <h3>Loading country data...</h3>
      ) : (
        <>
          <div className='flex justify-between items-center py-3 px-4 border-b dark:border-gray-700'>
            <h3 className='font-bold text-gray-800 dark:text-white'>
              {`${countryDetails?.name}`}
              {countryDetails?.emoji}
            </h3>
          </div>
          <div className='p-4'>
            <ul className='text-gray-800 dark:text-gray-400'>
              <li>{`Capital city: ${countryDetails?.capital}`}</li>
              <li>{`Continent: ${countryDetails?.continent?.name}`}</li>
              <li>{`Currency: ${countryDetails?.currency}`}</li>
              <li>Languages</li>
              <ul aria-label='Languages'>
                {countryDetails?.languages.map(
                  (language: language, index: number) => {
                    return (
                      <li className='ml-4' key={index}>
                        {`${language.name} (native: ${language.native})`}
                      </li>
                    )
                  }
                )}
              </ul>
              <li>{`Phone: ${countryDetails?.phone}`}</li>
              {subdivisions && <li>Subdivisions</li>}
              <ul className='pl-4 columns-3'>
                {subdivisions?.map(
                  (subdivision: subdivision, index: number) => {
                    return <li key={index}>{subdivision.name}</li>
                  }
                )}
              </ul>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
