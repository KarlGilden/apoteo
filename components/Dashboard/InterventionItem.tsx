import React, { useState } from 'react'
import InterventionModal from './InterventionModal';

interface IProps{
    intervention: any,
    openModal: React.Dispatch<React.SetStateAction<boolean>>
    setIntervention: React.Dispatch<React.SetStateAction<any>>

}
const InterventionItem = ({intervention, setIntervention, openModal}:IProps) => {

  const handleClick = () => {
    setIntervention(intervention)
    openModal(true)
  }

  return (
    <div onClick={()=>handleClick()} className='flex items-center justify-between p-3 bg-light-grey border-primary hover:bg-off-white cursor-pointer'>
        <p className='text-dark-green'>{intervention.title}</p>
        <div className='flex items-center'>
            {intervention.tags.replace(/(^[,\s]+)|([,\s]+$)/g, '').split(",").map((value:any, index:number)=>{
                return <small className='px-2 py-1 w-fit bg-secondary text-white border-secondary border-2 rounded-md' key={index}>{value}</small>
            })}
        </div>
    </div>
  )
}

export default InterventionItem