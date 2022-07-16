import React from 'react'

interface IProps{
    name:string,
    inputKey: string,
    onValueChange: (key:string, value:string) => void,
    value:number

}
const LogNumInput = ({name, inputKey, onValueChange, value}:IProps) => {
  return (
    <div className='flex justify-between w-full sm:w-[200px]'>
        <label htmlFor="" className='text-sm text-white'>{name}</label>
        <input 
        className='w-[100px] text-sm p-1 sm:w-[75px] h-[15px]' 
        type="number"
        value={value}
        onChange={(e)=>{
          onValueChange(inputKey, e.target.value)
        }}
        />
    </div>
  )
}

export default LogNumInput