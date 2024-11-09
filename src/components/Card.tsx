'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FaCalendarDays } from 'react-icons/fa6'
function Card({Name,Organiser,College,members,type }:{Name:string,Organiser:string,College:string, members:number,type:string}) {
    const btclass = 'bg-[#FBBEFB] text-black text-sm  rounded-xl min-w-[30%] text-center cursor-pointer '

  return (
    <div className=' min-w-[15vw] text-white bg-gradient-to-tr from-black to-blue-950 w-[30vw] border border-l-[#EC41F2] border-b-[#EC41F2] border-t-[#EC41F2] border-r-[#721d75fb] rounded-3xl p-4 overflow-hidden'>
        <div className='flex gap-4 p-4'>
            <Image src={"/Rectangle4.png"} alt='rect' width={120} height={120} ></Image>
            <div>
                <div className='flex justify-between items-center'>
                    <div>{members} members</div>
                    <div className='bg-gray-600 rounded-xl px-2 py-1'>{type}</div>
                </div>
                <div className='font-extrabold text-3xl'>{Name}</div>
                <Link href={`/dashboard/${Organiser}?college=${College}&members=${members}`}>{Organiser}</Link>
                <div>{College}</div>
            </div>
        </div>
        <hr />
        <div className='flex flex-col gap-4 p-4'>
            <div className='flex justify-evenly items-center'>
                <button className='bg-gray-600 text-white  rounded-xl px-2 text-sm'>Announcements</button>
                <button className={btclass}>Summary</button>
                <button className={btclass}>Schedule</button>
            </div>
            <div className='flex justify-evenly items-center'>
                <button className='bg-gray-600 text-white  rounded-xl px-2 text-sm'>Announcements</button>
                <button className={btclass}>Summary</button>
                <button className={btclass}>Schedule</button>
            </div>
            <div className='flex justify-evenly items-center'>
                <button className='bg-gray-600 text-white  rounded-xl px-2 text-sm'>Announcements</button>
                <button className={btclass}>Summary</button>
                <button className={btclass}>Schedule</button>
            </div>
        </div>
        <hr />
        <div className='flex justify-between items-center p-4 gap-2'>
            <Link href={"/"} className='px-2 py-1 rounded-xl border border-l-[#EC41F2] border-b-[#EC41F2] border-t-[#EC41F2] border-r-[#721d75fb]'>Dashboard</Link>
            <FaCalendarDays size={40}/>
        </div>
    </div>
  )
}

export default Card