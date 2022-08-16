import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className='w-full h-[72px] bg-off-white absolute flex items-center px-24'>
        <Link href="/dashboard"><a className='text-dark-green'>Dashboard</a></Link>
        <div className='p-2'></div>
        <Link href="/new-log"><a className='text-dark-green'>New Log</a></Link>
    </div>
    </>
    
  )
}

export default Navbar