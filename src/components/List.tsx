import './list.css'
interface ListProps {
  onClick: (event: React.SyntheticEvent) => string
  emojis: string[]
  searchTerms: string[]
}

export function List({ onClick, emojis, searchTerms }: ListProps) {
  return (
    <div className='bg-gradient-to-r from-system-manila to-system-lace w-2/3 p-1'>
      <div className='grid grid-cols-4 gap-4'>
        {searchTerms.map((term, index) => {
          return (
            <div
              className='h-28 md:h-32 lg:h-40 xl:h-44 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]'
              key={index}
            >
              <div className='flex flex-col items-center gap-4 p-4 md:p-5'>
                <h3 className='text-lg text-center font-bold text-gray-800 dark:text-white'>
                  {term}
                </h3>
                <span>{emojis[index]}</span>
                <button
                  type='button'
                  className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
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
