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
    <div onClick={()=>handleClick()} className='flex justify-between p-3 bg-light-grey border-primary hover:bg-off-white cursor-pointer'>
        <p className='text-dark-green'>{intervention.title}</p>
        <div className='flex'>
            {intervention.tags.split(",").map((value:any, index:number)=>{
                return <p key={index}>{value}</p>
            })}
        </div>
    </div>
  )
}

export default InterventionItem