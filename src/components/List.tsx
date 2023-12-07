import './list.css'
interface ListProps {
  onClick: (event: React.SyntheticEvent) => string
  emojis: string[]
  searchTerms: string[]
}

export function List({ onClick, emojis, searchTerms }: ListProps) {
  return (
    <div className='bg-gradient-to-b from-system-manila to-system-lace w-full h-screen p-1'>
      <div className='grid grid-cols-4 gap-4'>
        {searchTerms.map((term, index) => {
          return (
            <div
              className='h-28 md:h-32 lg:h-40 xl:h-44 border border-dotted shadow-sm rounded-xl'
              key={index}
            >
              <div className='flex flex-col items-center gap-4 p-4 md:p-5'>
                <h3 className='text-lg text-center font-bold text-gray-800'>
                  {term}
                </h3>
                <span>{emojis[index]}</span>
                <button
                  type='button'
                  className='py-3 px-4 gap-x-2 text-sm font-semibold rounded-lg border hover:bg-system-navy hover:text-lime-green transition-all'
                  onClick={onClick}
                  // @ts-ignore
                  popovertarget='details-popover'
                >
                  More info
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
