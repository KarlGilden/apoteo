import React from 'react'

interface IProps{
    type:string,
    label:string
}
const FormInput = ({ type, label}:IProps) => {
  return (
    <div className='flex flex-col mb-3'>
        <label className='text-white mb-1' htmlFor="">{label}:</label>
        <input type={type} className='border-[#222] focus:outline-none focus:bg-primary-dark focus:border-[#111] text-white rounded-md border-[2px] p-1 bg-transparent'/>
    </div>
  )
}

export default FormInput