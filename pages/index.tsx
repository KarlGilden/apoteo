import type { NextPage } from 'next'
import { useEffect } from 'react'
import FormInput from '../components/FormInput'
import HeaderContainer from '../components/HeaderContainer'
import LoginContainer from '../components/LoginContainer'

const Home: NextPage = () => {

  return (
    <div className='w-screen min-h-screen pt-[72px] sm:flex sm:pt-0 justify-center items-center bg-white'>
      <section className='p-5  sm:flex'>

        <HeaderContainer/>

        <div className='p-10 sm:p-5'></div>

        <LoginContainer/>

      </section>
    </div>
  )
}

export default Home
