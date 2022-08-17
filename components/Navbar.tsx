import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='w-full h-[72px] bg-white absolute flex justify-center items-center px-5 sm:justify-start sm:px-24'>
        <Link href="/"><a className='text-dark-green'>Home</a></Link>
        <div className='p-2'></div>
        <Link href="/dashboard"><a className='text-dark-green'>Dashboard</a></Link>
        <div className='p-2'></div>
        <Link href="/new-log"><a className='text-dark-green'>New Log</a></Link>
    </nav>
    </>
    
  )
}

export default Navbar