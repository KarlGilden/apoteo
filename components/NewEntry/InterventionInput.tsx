import React, { useState } from 'react'
import IssueItem from '../IssueItem'
import AddInterventionModal from './AddInterventionModal'

interface IProps{
    interventions: any[],
    setInterventions: (issue:any)=>void
}

const InterventionInput = ({interventions, setInterventions }:IProps) => {
    const [showInterventionsModal, setShowInterventionsModal] = useState(false);

    const openInterventionModal = () => {
        setShowInterventionsModal(true)
        document.querySelector('body')?.classList.add('overflow-hidden')
    }

    const closeInterventionModal = () => {
        setShowInterventionsModal(false)
        document.querySelector('body')?.classList.remove('overflow-hidden')
    }
  return (
    <>
    <AddInterventionModal 
        interventions={interventions} 
        setInterventions={setInterventions} 
        show={showInterventionsModal}
        handleClose={()=>closeInterventionModal()}
    />

    <div className='flex flex-col w-full'>
        <div className='w-full h-full '>

            <div className='w-full bg-secondary p-3'>
                <h2 className='text-white'>Interventions</h2>
            </div>

            {interventions.length > 0 && interventions.map((value, index)=>{
                return(
                    <IssueItem key={index} index={index} interventions={interventions} setInterventions={setInterventions} value={value}/>
                )
            })}

            <div className='m-3 text-center'>
                <button onClick={()=>{openInterventionModal()}} className='p-3 w-[90%] hover:bg-off-white bg-light-grey rounded-md '>New issue +</button>
            </div>

        </div>
    </div>
    </>
  )
}

export default InterventionInput