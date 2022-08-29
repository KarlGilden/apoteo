import type { NextPage } from 'next'
import { useEffect } from 'react'
import FormInput from '../components/FormInput'
import HeaderContainer from '../components/HeaderContainer'
import LoginContainer from '../components/LoginContainer'

const Home: NextPage = () => {

  return (
    <>
    <main className='w-full min-h-screen pt-[72px] sm:flex sm:pt-0 justify-center items-center bg-white'>
      <section className='p-5  sm:flex'>

        <HeaderContainer/>

        <div className='p-10 sm:p-5'></div>

        <LoginContainer/>

      </section>
    </main>
    <section className='h-screen w-full bg-primary-dark p-10 '>
      <h1 className='text-white text-4xl'>What is Apoteo?</h1>
      <p className='p-2'></p>
      <div className=' sm:flex'>
        <p className='text-white'>Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
          <p className='p-2'></p>
          <div className='w-full bg-secondary sm:w-[50%]'>

          </div>
      </div>

    </section>
    </>
  )
}

export default Home
