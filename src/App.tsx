import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Search } from './components/Search'

function App() {
  return (
    <main className='flex flex-row'>
      <Search />
      <div>List</div>
      <div>Popover</div>
    </main>
  )
}

export default App
