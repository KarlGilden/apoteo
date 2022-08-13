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
    <div onClick={()=>handleClick()} className='flex justify-between p-3 border-primary-dark border-b-[1px] hover:bg-primary-dark cursor-pointer'>
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