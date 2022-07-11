import React from 'react'

interface IProps{
    type:string,
    label:string
}
const FormInput = ({ type, label}:IProps) => {
  return (
    <div className='flex flex-col mb-3'>
        <label htmlFor="">{label}:</label>
        <input type={type} className='border-black border-[1px] p-1'/>
    </div>
  )
}

export default FormInput