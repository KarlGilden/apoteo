import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface IProps {
    show:boolean,
    handleClose: ()=>void,
    intervention: any
}

const InterventionModal = ({intervention, handleClose, show}:IProps) => {
    const [isBrowser, setIsBrowser] = useState(false)



      const closeModal = () => {
        handleClose()
      }
      useEffect(()=>{
        setIsBrowser(true)
      },[])

      const modal = show ? (
        <div className={`overflow-hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50  flex justify-center items-center`}>
          <div className='max-w-[600px] w-[90%] bg-white p-5 rounded-md'>
    
            <div className='flex justify-between items-center'>
              <h1 className='text-dark-green text-4xl'>{intervention.title}</h1>
              <p className='text-2xl' onClick={()=>closeModal()}>close</p>
            </div>
            <div className='p-5'></div>
            <div>
                <p>{intervention.description}</p>
                <div className='p-5'></div>
                <p className='px-2 py-1 w-fit bg-secondary text-white border-secondary border-2 rounded-md'>{intervention.tags.replace(/(^[,\s]+)|([,\s]+$)/g, '')}</p>
            </div>
    
          </div>
        </div>
      ) : null
      
      if(isBrowser){
        return ReactDOM.createPortal(
          modal,
          document.getElementById("modal-root") as HTMLElement
        );
      }else{
        return null;
      }
}

export default InterventionModal