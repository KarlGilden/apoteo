import Link from 'next/link'
import React from 'react'

const HeaderContainer = () => {
  return (
    <div className='p-5 flex flex-col justify-between max-w-[600px]'>
      <div className='text-center sm:text-left sm:pl-[10px]'>
        <h1 className='text-6xl font-bold text-secondary  mb-2'>Apoteo</h1>
        <h3 className='text-3xl text-dark-green'>A web based solution to pharmacy data entry and analysis</h3>
      </div>
      <div className='p-2'></div>

      <div className='flex w-full my-6 sm:my-0'>
        <Link href="/api/auth/signin"><button className='bg-secondary p-4 rounded-md text-white w-full mx-[10px]'>Login</button></Link>
        <Link  href="#about" scroll={true}><button className='bg-secondary p-4 rounded-md text-white w-full mx-[10px]'>Learn more</button></Link>
      </div>
  </div>
  )
}

export default HeaderContainer