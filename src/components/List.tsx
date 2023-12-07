import { useGetCountryDetails } from '../hooks'
interface ListProps {
  onClick: (event: React.SyntheticEvent) => void
  onReset: () => void
  searchTerms: string[]
}

export function List({ onClick, onReset, searchTerms }: ListProps) {
  return (
    <div className='bg-light-gray w-2/3'>
      <ul>
        {searchTerms.map((term, index) => (
          <li key={index}>
            {/* @ts-ignore */}
            <button onClick={onClick} popovertarget='details-popover'>{term}</button>
          </li>
        ))}
      </ul>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}
