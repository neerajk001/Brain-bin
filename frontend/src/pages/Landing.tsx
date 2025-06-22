import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

function Landing() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black "'>
        <Navbar/>
        <Hero/>
    </div>
  )
}

export default Landing