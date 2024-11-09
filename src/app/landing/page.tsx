'use client'
import { signIn } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/navigation'

function Landing() {
    const router  =  useRouter()
  return (
    <div>
        <button className='w-20 h-6 bg-white text-black' onClick={()=>router.push('/login')}>
            Signin
        </button>
    </div>
  )
}

export default Landing