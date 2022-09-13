import React, { useState } from 'react'
import EditErrorModal from './EditErrorModal';

interface IProps{
  errors: any[],
  setErrors: (issue:any)=>void
}

const ErrorItem = (props:any) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true)
    document.querySelector('body')?.classList.add('overflow-hidden')
}

const closeModal = () => {
    setShowModal(false)
    document.querySelector('body')?.classList.remove('overflow-hidden')
}

  return (
    <>
      <EditErrorModal 
        errors={props.errors} 
        setErrors={props.setErrors} 
        show={showModal}
        handleClose={()=>closeModal()}
        index={props.index}
      />
      <div onClick={()=>{openModal()}} className='w-full cursor-pointer p-3 border-primary-dark bg-light-grey border-b-[1px] border-primary-dark flex items-center justify-between'>
        <p>{props.value.title}</p>
        <div className='flex flex-wrap'>
            {props.value.tags.split(',').map((tag:string, index:number) => {
                return (
                    <p key={index} className='m-1 p-1 border-[1px] rounded-md'>{tag}</p>
                )
            })}
        </div>
    </div>
    </>

  )
}

export default ErrorItem