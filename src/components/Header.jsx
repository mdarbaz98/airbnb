import React from 'react'
import {BiSearch} from 'react-icons/bi';
import {FiMenu} from 'react-icons/fi';
import { Avatar } from 'primereact/avatar';
 

export default function Header() {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'> 
    <div className="py-3 border-b-[1px]">
        <nav className='flex items-center justify-between px-5'>
            <div className="logo">
                <img src="https://i.pngimg.me/thumb/f/720/comdlpng6937627.jpg"  className="w-20" alt="" />
            </div>
            <div className="search__section 
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer">
                <div className='
                flex
                items-center
                justify-between
                '>
                    <div className="text-sm
                    font-semibold
                    px-6">
                        Anywhere
                    </div>
                    <div className="hidden 
                    sm:block
                    text-sm
                    font-semibold
                    px-6
                    flex-1
                    border-x-[1px]
                    text-center">
                        Anyweek
                    </div>
                    <div className='
                    text-sm
                    pl-6
                    pr-2
                    text-gray-600
                    flex
                    flex-row
                    items-center
                    gap-3'>
                        <div className='hidden sm:block'>Add Guests</div>
                        <div className='
                        p-2
                        bg-rose-500
                        text-white
                        rounded-full'>
                            <BiSearch />
                        </div>
                    </div>
                </div>
            </div>
            <div className='user__menu flex flex-row items-center gap-3'>
            <div className=" 
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            cursor-pointer
            transition">
                airbnb
            </div>
            <div className='
            rounded-full
            p-4
            md:py-1
            md:px-3
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            cursor-pointer
            hover:shadow-md
            transition'>
                <FiMenu />
                <div className='hidden md:block'>
                <Avatar label='A' className='bg-gray-700  text-white w-6 text-sm h-6 flex items-center justify-center rounded-full' />
                </div>
            </div>
            </div>
        </nav>
    </div>
    </div>
  )
}
