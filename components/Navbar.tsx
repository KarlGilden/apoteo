import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-[72px] bg-primary-dark absolute flex items-center px-24'>
        <Link href="/"><a className='text-white'>Home</a></Link>
        <div className='p-2'></div>
        <Link href="/"><a className='text-white'>New Log</a></Link>
    </div>
  )
}

export default Navbar