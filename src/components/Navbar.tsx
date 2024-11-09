'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import CreatePostDrawer from './CreateDrawer'

function Navbar({type}:{type:string}) {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const btclass = ' text-gray-100 font-extrabold px-3 py-2 rounded-lg min-w-[7vw] text-center cursor-pointer bg-blue-700 hover:text-black'
    const mobileBtClass = 'bg-blue-700 text-gray-100 font-extrabold px-3 py-2 rounded-lg w-full text-center cursor-pointer  hover:text-black'
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className={`${type == 'fixed' && 'absolute'} w-full`}>
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-between px-6 py-2">
                <div className='flex justify-evenly gap-10 items-center'>
                    <Image 
                        src="/icon.png" 
                        alt='Icon' 
                        width={60} 
                        height={60} 
                        unoptimized={true} 
                        className='rounded-full'
                    />
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
                    <CreatePostDrawer />
                    <Link href={'/'} className={btclass}>Join</Link>
                </div>
                <button className='h-full p-4'>
                    <FaUser 
                        className='text-white' 
                        size={30} 
                        onClick={() => router.push('/profile')} 
                    /> 
                </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <div className="flex justify-between items-center px-4 py-2">
                    <Image 
                        src="/icon.png" 
                        alt='Icon' 
                        width={40} 
                        height={40} 
                        unoptimized={true} 
                        className='rounded-full'
                    />
                    <div className="flex items-center gap-4">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            alt='search' 
                            aria-label='search'
                            className='bg-gray-600 text-white placeholder-white px-2 py-1 rounded-lg w-32 border-none outline-none'
                        />
                        <button 
                            onClick={toggleMenu}
                            className="text-white p-2"
                        >
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-[60px] left-0 w-full bg-black bg-opacity-95 px-4 py-4 flex flex-col gap-4">
                        <Link href={'/'} className={mobileBtClass}>Clubs</Link>
                        <Link href={'/'} className={mobileBtClass}>Councils</Link>
                        <Link href={'/'} className={mobileBtClass}>Events</Link>
                        <Link href={'/'} className={mobileBtClass}>Create+</Link>
                        <Link href={'/'} className={mobileBtClass}>Join</Link>
                        <button 
                            className='flex items-center gap-2 text-white px-3 py-2'
                            onClick={() => router.push('/profile')}
                        >
                            <FaUser size={20} />
                            <span>Profile</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar