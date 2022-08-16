import React from 'react'

interface IProps{
    type:string,
    label:string,
    setFormState: (state:string)=>void
}
const FormInput = ({ type, label, setFormState}:IProps) => {
  return (
    <div className='flex flex-col mb-3'>
        <label className='text-dark-green mb-1' htmlFor="">{label}:</label>
        <input 
          type={type} 
          className='border-off-white focus:outline-none focus:bg-off-white focus:border-[#111] text-dark-green rounded-md border-[2px] p-1 bg-transparent'
          onChange={(e)=>{
            setFormState(e.target.value)
          }}
        />
    </div>
  )
}

export default FormInput