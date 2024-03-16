import React from 'react'
import Homepage from './pages/Homepage'
import Auth from './pages/Auth'

const App = () => {
  return (
    <div className='app'>
      <Auth/>
      <Homepage/>
    </div>
  )
}

export default App