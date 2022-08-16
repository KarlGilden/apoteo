import React from 'react'
import FormInput from './FormInput'
import { signIn, signOut, useSession } from "next-auth/react"

const LoginContainer = () => {
  return (
    <div className='w-full max-w-[400px] m-auto flex flex-col justify-between p-5  rounded-md' >
        <h2 className='text-5xl mb-3 text-dark-green'>Login</h2>

        <FormInput setFormState={()=>{}} type={"text"} label={"Email"}/>

        <FormInput setFormState={()=>{}} type={"password"} label={"Password"}/>

        <button onClick={()=>{signIn()}} className='bg-secondary p-4 rounded-md text-white'>Login</button>
  </div>
  )
}

export default LoginContainer