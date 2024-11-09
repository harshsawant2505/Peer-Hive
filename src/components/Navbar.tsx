'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

function Navbar({type}:{type:string}) {
    const router = useRouter()
    console.log(type)
    const btclass = 'bg-[#FBBEFB] text-black font-extrabold px-3 py-2 rounded-lg min-w-[7vw] text-center cursor-pointer hover:bg-[#FBBEFB] hover:text-black'
  return (
    <div className={`${type == 'fixed'&&'absolute'} w-full`}>

    <div className={`hidden md:flex justify-between px-6 py-2 `}>
        <div className='flex justify-evenly gap-10 items-center '>
            <Image src={"/icon.png"} alt='Icon' width={60} height={60} unoptimized={true} className='rounded-full'></Image>
            <input 
                type="text" 
                placeholder="Search" 
                alt='search' 
                aria-label='search'
                className='bg-gray-600 text-white placeholder-white px-2 py-2 rounded-lg w-[15vw] border-none outline-none'
                />
            <Link href={'/'} className={btclass}>Clubs</Link>
            <Link href={'/'} className={btclass}>Councils</Link>
            <Link href={'/'} className={btclass}>Events</Link>
            <Link href={'/'} className={btclass}>Create+</Link>  
            <Link href={'/'} className={btclass}>Join</Link>
        </div>
        <button className='h-full p-4'>
            <FaUser className='text-white' size={30} onClick={()=>router.push('/profile')} /> 
        </button>
    </div>
</div>
  )
}

export default Navbar
