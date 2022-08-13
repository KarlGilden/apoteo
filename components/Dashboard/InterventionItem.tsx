import React from 'react'

interface IProps{
    intervention: any
}
const InterventionItem = ({intervention}:IProps) => {
  return (
    <div className='flex justify-between p-3 border-primary-dark border-b-[1px] hover:bg-primary-dark cursor-pointer'>
        <p className='text-white'>{intervention.title}</p>
        <div className='flex'>
            {intervention.tags.split(",").map((value:any)=>{
                return <p>{value}</p>
            })}
        </div>
    </div>
  )
}

export default InterventionItem