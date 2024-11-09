'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaCalendarDays, FaUsers, FaChevronDown } from 'react-icons/fa6'

function Card({
  Name,
  Organiser,
  College,
  members,
  type
}: {
  Name: string,
  Organiser: string,
  College: string,
  members: number,
  type: string
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const desc: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis velit necessitatibus, repellat laudantium Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur officia eveniet ut minus nostrum quo accusamus. Placeat voluptates corrupti inventore quod ea facilis molestiae quis ut magnam, nesciunt amet similique perferendis aut cupiditate sequi consectetur laborum dignissimos qui exercitationem cum?"

  return (
    <div className='relative group w-full sm:w-[90%] md:w-[80%] lg:w-[30vw] min-w-[280px]'>
      {/* Desktop View */}
      <div className='hidden sm:block transform hover:scale-[1.02] transition-all duration-300 text-white bg-gradient-to-tr from-slate-900 to-blue-950 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl'>
        {/* Gradient Border Effect */}
        <div className='absolute inset-0 bg-gradient-to-tr from-slate-900 to-blue-950 opacity-50 group-hover:opacity-70 transition-opacity rounded-2xl -z-10'></div>
        
        {/* Main Content */}
        <div className='p-4 space-y-4'>
          {/* Header Section */}
          <div className='flex gap-4'>
            <div className='relative w-[120px] h-[120px] rounded-xl overflow-hidden shrink-0'>
              <Image 
                src="/Rectangle4.png" 
                alt={Name}
                fill
                className='object-cover'
                sizes="120px"
              />
            </div>
            
            <div className='flex-1 space-y-2'>
              <div className='flex justify-between items-center flex-wrap gap-2'>
                <div className='flex items-center gap-2 text-gray-300'>
                  <FaUsers className="text-white" />
                  <span>{members} members</span>
                </div>
                <div className='px-3 py-1 bg-[#EC41F2]/20 border border-[#EC41F2]/30 rounded-full text-sm font-medium'>
                  {type}
                </div>
              </div>
              
              <div className='space-y-1'>
                <h2 className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                  {Name}
                </h2>
                <Link 
                  href={`/dashboard/${Organiser}?college=${College}&members=${members}`}
                  className='text-white hover:text-[#f76df7] transition-colors font-medium'
                >
                  {Organiser}
                </Link>
                <p className='text-gray-400'>{College}</p>
              </div>
            </div>
          </div>

          <div className='text-gray-300 text-sm leading-relaxed'>
            {desc.split(' ').slice(0, 15).join(' ')}...
          </div>

          <div className='h-px bg-gradient-to-r from-transparent via-[#EC41F2]/50 to-transparent'></div>

          <div className='flex justify-between items-center pt-2'>
            <Link 
              href={`/dashboard/${Organiser}?college=${College}&members=${members}`}
              className='px-4 py-2 bg-[#EC41F2]/20 hover:bg-[#EC41F2]/30 border border-[#EC41F2]/30 rounded-xl transition-colors duration-300 text-sm font-medium'
            >
              Dashboard
            </Link>
            <FaCalendarDays 
              size={30} 
              className='text-white hover:text-[#f76df7] transition-colors cursor-pointer'
            />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className='sm:hidden bg-gradient-to-tr from-slate-900 to-blue-950 rounded-xl overflow-hidden shadow-lg text-white'>
        {/* Top Section */}
        <div className='p-4 space-y-3'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='relative w-12 h-12 rounded-full overflow-hidden shrink-0'>
                <Image 
                  src="/Rectangle4.png" 
                  alt={Name}
                  fill
                  className='object-cover'
                  sizes="48px"
                />
              </div>
              <div>
                <h3 className='font-bold text-lg'>{Name}</h3>
                <p className='text-sm text-gray-400'>{College}</p>
              </div>
            </div>
            <div className='px-2 py-1 bg-[#EC41F2]/20 border border-[#EC41F2]/30 rounded-full text-xs font-medium'>
              {type}
            </div>
          </div>

          {/* Stats */}
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-1 text-gray-300'>
              <FaUsers className="text-white" size={14} />
              <span>{members} members</span>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className='flex items-center gap-1 text-white'
            >
              {isExpanded ? 'Show less' : 'Show more'}
              <FaChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Expandable Content */}
        <div className={`
          overflow-hidden transition-all duration-300
          ${isExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className='p-4 space-y-3 bg-black/20'>
            {/* Description */}
            <p className='text-sm text-gray-300'>
              {desc.split(' ').slice(0, 15).join(' ')}...
            </p>

            {/* Organizer */}
            <div>
              <Link 
                href={`/dashboard/${Organiser}?college=${College}&members=${members}`}
                className='text-white text-sm font-medium'
              >
                {Organiser}
              </Link>
            </div>

            {/* Actions */}
            <div className='flex items-center justify-between pt-2'>
              <Link 
                href="/" 
                className='px-3 py-1.5 bg-[#EC41F2]/20 border border-[#EC41F2]/30 rounded-lg text-xs font-medium'
              >
                Dashboard
              </Link>
              <FaCalendarDays 
                size={24} 
                className='text-white'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card