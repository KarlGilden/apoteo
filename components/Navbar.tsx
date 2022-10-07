import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const {data: session} = useSession();

  

  return (
    <>
    <nav className='w-full h-[72px] bg-white absolute flex justify-center items-center px-5 sm:justify-start sm:px-24'>

        {session ? 
          <>
          <Link href="/dashboard"><a className='text-dark-green'>Dashboard</a></Link>
          <div className='p-2'></div>
          <Link href="/new"><a className='text-dark-green'>New Entry</a></Link>
          <div className='p-2'></div>
          <Link href="/api/auth/signout"><a className='text-white bg-secondary rounded-md px-2 py-1'>Log out</a></Link>
          </>
          : 
          <>
          <Link href="/"><a className='text-dark-green'>Home</a></Link>
          <div className='p-2'></div>
          <Link href="/api/auth/signin"><a className='text-white bg-secondary rounded-md px-2 py-1'>Log in</a></Link>
          </>
        }
    </nav>
    </>
    
  )
}

export default Navbar