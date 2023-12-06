interface ListProps {
  onReset: () => void
  searchTerms: string[]
}

export function List( {onReset, searchTerms}: ListProps) {
  return (
    <div className='bg-light-gray w-1/3'>
      <ul>
        {searchTerms.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}