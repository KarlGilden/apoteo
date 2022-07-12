import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-screen h-[72px] bg-primary-dark fixed flex items-center px-24'>
        <Link href="/"><a className='text-white'>Home</a></Link>
        <div className='p-2'></div>
        <Link href="/"><a className='text-white'>About</a></Link>
    </div>
  )
}

export default Navbar