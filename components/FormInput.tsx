import React from 'react'

interface IProps{
    type:string,
    label:string,
    setFormState: (state:string)=>void
}
const FormInput = ({ type, label, setFormState}:IProps) => {
  return (
    <div className='flex flex-col mb-3'>
        <label className='text-white mb-1' htmlFor="">{label}:</label>
        <input 
          type={type} 
          className='border-[#222] focus:outline-none focus:bg-primary-light focus:border-[#111] text-white rounded-md border-[2px] p-1 bg-transparent'
          onChange={(e)=>{
            setFormState(e.target.value)
          }}
        />
    </div>
  )
}

export default FormInput