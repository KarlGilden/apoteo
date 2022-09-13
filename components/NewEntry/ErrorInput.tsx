import React, { useState } from 'react'
import AddErrorModal from './AddErrorModal'
import ErrorItem from './ErrorItem'

interface IProps{
    errors: any[],
    setErrors: (issue:any)=>void
}

const ErrorInput = ({errors, setErrors }:IProps) => {
    const [showErrorsModal, setShowErrorsModal] = useState(false);

    const openErrorModal = () => {
        setShowErrorsModal(true)
        document.querySelector('body')?.classList.add('overflow-hidden')
    }

    const closeErrorModal = () => {
        setShowErrorsModal(false)
        document.querySelector('body')?.classList.remove('overflow-hidden')
    }
  return (
    <>
    <AddErrorModal 
        errors={errors} 
        setErrors={setErrors} 
        show={showErrorsModal}
        handleClose={()=>closeErrorModal()}
    />

    <div className='flex flex-col w-full'>
        <div className='w-full h-full '>

            <div className='w-full bg-secondary p-3'>
                <h2 className='text-white'>Errors</h2>
            </div>

            {errors.length > 0 && errors.map((value, index)=>{
                return(
                    <ErrorItem key={index} index={index} errors={errors} setErrors={setErrors} value={value}/>
                )
            })}

            <div className='m-3 text-center'>
                <button onClick={()=>{openErrorModal()}} className='p-3 w-[90%] hover:bg-off-white bg-light-grey rounded-md '>New issue +</button>
            </div>

        </div>
    </div>
    </>
  )
}

export default ErrorInput