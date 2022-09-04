import React from 'react'

interface IProps {
    label:string,
    type: string,
    script:string,
    onScriptChange: (value:number, type:string, script:string) => void,
}
const ScriptInput = ({label, onScriptChange, type, script}:IProps) => {
  return (
    <div>
        <div className='flex justify-between w-full sm:w-full '>
            <label className='text-sm ' htmlFor="">{label}:</label>
            <input className='px-1 w-[75px] sm:w-[200px] border-black border-[1px] rounded-sm' type="number" onChange={(e)=>{onScriptChange(parseInt(e.target.value), type, script)}}/>
        </div>
    </div>
  )
}

export default ScriptInput