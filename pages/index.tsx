import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen sm:flex items-center'>
      <section className='sm:w-[50%] h-[75%] bg-primary p-10'>
        <h1 className='text-6xl font-mono text-secondary'>Apoteo</h1>
      </section>
      <section className='sm:w-[50%] h-[75%] bg-secondary'>
        <div className='max-w-[400px] flex flex-col p-2'>
          <h2 className='text-6xl'>Login</h2>

          <label htmlFor="">Email:</label>
          <input type="text" />

          <label htmlFor="">Password</label>
          <input type="text" />

          <button>Login</button>

        </div>
      </section>
    </div>
  )
}

export default Home
