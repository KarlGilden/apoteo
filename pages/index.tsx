import type { NextPage } from 'next'
import FormInput from '../components/FormInput'
import HeaderContainer from '../components/HeaderContainer'
import LoginContainer from '../components/LoginContainer'

const Home: NextPage = () => {
  return (
    <div className='w-screen min-h-screen sm:flex justify-center items-center bg-primary'>
      <section className='p-5 sm:flex'>

        <HeaderContainer/>

        <div className='p-10 sm:p-5'></div>

        <LoginContainer/>

      </section>
    </div>
  )
}

export default Home
