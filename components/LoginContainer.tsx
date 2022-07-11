import React from 'react'
import FormInput from './FormInput'

const LoginContainer = () => {
  return (
    <div className='w-full max-w-[400px] m-auto flex flex-col justify-between p-5  rounded-md' >
        <h2 className='text-5xl mb-3 text-white'>Login</h2>

        <FormInput type={"text"} label={"Email"}/>

        <FormInput type={"password"} label={"Password"}/>

        <button className='bg-secondary p-4 rounded-md text-white'>Login</button>
  </div>
  )
}

export default LoginContainer