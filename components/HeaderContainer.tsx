import React from 'react'

const HeaderContainer = () => {
  return (
    <div className='p-5 flex flex-col justify-between'>
    <div className='text-center sm:text-left sm:pl-[10px]'>
      <h1 className='text-6xl font-bold text-secondary  mb-2'>Apoteo</h1>
      <h3 className='text-3xl text-dark-green'>The dynamic solution to pharmacy management</h3>
    </div>

    <div className='flex w-full my-6 sm:my-0'>
      <button className='bg-secondary p-4 rounded-md text-white w-full mx-[10px]'>Get Started</button>
      <button className='bg-secondary p-4 rounded-md text-white w-full mx-[10px]'>Learn more</button>
    </div>
  </div>
  )
}

export default HeaderContainer