import React from 'react'

interface IProps {
    label:string,
    id: string,
    name:string,
    onScriptChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
}
const ScriptInput = ({label, onScriptChange, id, name}:IProps) => {
  return (
    <div>
        <div className='flex justify-between w-full sm:w-full '>
            <label className='text-sm ' htmlFor="">{label}:</label>
            <input className='px-1 w-[75px] sm:w-[200px] border-black border-[1px] rounded-sm' id={id} name={name} type="number" onChange={(e)=>{onScriptChange(e)}}/>
        </div>
    </div>
  )
}

export default ScriptInput