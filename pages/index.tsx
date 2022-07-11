import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className='w-screen min-h-screen sm:flex justify-center items-center bg-primary'>

      <section className='p-5 sm:flex'>

        {/* Hero component*/} 

        <div className=''>
          <div className='text-center sm:text-left sm:pl-[10px]'>
            <h1 className='text-6xl font-bold text-secondary  mb-2'>Apoteo</h1>
            <h3 className='text-3xl text-white'>The dynamic solution to pharmacy management</h3>
          </div>

          <div className='flex w-full my-6'>
            <button className='bg-secondary p-4 rounded-md text-white w-full mx-[10px]'>Get Started</button>
            <button className='bg-secondary p-4 rounded-md text-white w-full mx-[10px]'>Learn more</button>
          </div>
        </div>

        <div className='p-10 sm:p-5'></div>

        {/* Login component*/}
        
        <div className='w-full max-w-[400px] m-auto flex flex-col justify-between p-5 bg-white rounded-md' >
          <h2 className='text-5xl mb-3'>Login</h2>

          <div className='flex flex-col mb-3'>
            <label htmlFor="">Email:</label>
            <input type="text" className='border-black border-[1px]'/>
          </div>

          <div className='flex flex-col mb-3'>
            <label htmlFor="">Password:</label>
            <input type="password" className='border-black border-[1px]'/>
          </div>

          <button className='bg-secondary p-4 rounded-md text-white'>Login</button>
        </div>

      </section>
    </div>
  )
}

export default Home
