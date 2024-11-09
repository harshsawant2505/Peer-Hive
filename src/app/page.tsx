import Navbar from '@/components/Navbar'
import React from 'react'

function Home() {
  return (
    <div>

    <Navbar />
    <div className='w-full h-screen bg-black text-white flex items-center justify-center'>
      <h1 className='text-4xl '>Home</h1>
      </div>
    </div>
  )
}

export default Home