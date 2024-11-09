import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';

function page({ params, searchParams }) {
    const organiser = decodeURIComponent(params.slug);
    const college = searchParams.college || '';
    const members = searchParams.members || '';

    return (
        <div className="bg-gradient-to-tr from-black to-blue-950 w-full min-h-screen overflow-x-hidden text-white">
            <Navbar />
            <div className="flex justify-between items-center p-8">
                <div className='flex justify-center items-center gap-4'>
                    <Image src={"/rectangle5.png"} width={100} height={100} alt="ClubPhoto" className="" />
                    <div>
                        <div className='text-3xl font-extrabold'>{organiser}</div>
                        <div className='text-2xl font-bold'>{college}</div>
                        <div className=''>{members} members</div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='bg-gray-300 rounded-xl px-4'>Role- President</div>
                    <div className='flex w-full justify-center items-center'>
                        <div className='bg-gray-300 rounded-xl px-4'>Events</div>
                        <div className='bg-gray-300 rounded-xl px-4'>Budget</div>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
