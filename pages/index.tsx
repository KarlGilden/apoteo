import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {BsGithub} from 'react-icons/bs'
import {MdOutlineWork} from 'react-icons/md'
import { useEffect } from 'react'
import FormInput from '../components/FormInput'
import HeaderContainer from '../components/HeaderContainer'
import LoginContainer from '../components/LoginContainer'
import DashboardImg from '../public/dashboard.jpeg'
const Home: NextPage = () => {

  return (
    <>
    <main className='w-full min-h-screen pt-[72px] sm:flex sm:pt-0 justify-center items-center bg-white'>
      <section className='p-5  sm:flex'>

        <HeaderContainer/>

      </section>
    </main>

    <section id='about' className='h-screen w-full bg-primary-dark p-16 text-white'>
      <h1 className='text-white text-5xl'>What is Apoteo?</h1>

      <p className='p-2'></p>

      <div className='flex flex-col sm:flex-row'>
        <div className='sm:w-[50%]'>
          <h2 className='text-2xl text-white italic '>A web based solution to pharmacy data entry and analysis</h2>
          
          <div className='p-2'></div>
          
          <div >
            <p className=''><b className='text-xl'>Problem:</b> Entering pharmacy data by hand is difficult and finding it even harder.</p>
            <div className='p-2'></div>
            <p><b className='text-xl'>Solution:</b> A lightweight web based application to handle data entry and a sleek dashboard to facilitate analysis</p>
          </div>

          <div className='p-2'></div>

          <div className='flex items-center'>
            <h5>Links:</h5>
            <div className='p-2'></div>
            <Link target={"_blank"} href={'https://github.com/KarlGilden/apoteo'}><BsGithub className='text-3xl hover:fill-secondary cursor-pointer'/></Link>
            <div className='p-2'></div>
            <Link target={"_blank"} href={'https://kgilden.com'}><MdOutlineWork className='text-3xl hover:fill-secondary cursor-pointer'/></Link>
          </div>

        </div>

        <div className='p-2'></div>

        <div className='sm:w-[50%]'>
          <Image src={DashboardImg} 
            width={800}
            height={450}
            layout="responsive" />
        </div>

      </div>
    </section>
    </>
  )
}

export default Home
