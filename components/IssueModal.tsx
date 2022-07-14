import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
interface IProps {
  show:boolean,
  handleClose:()=>void
}

const IssueModal = ({show, handleClose}:IProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(()=>{
    setIsBrowser(true)
  },[])

  const modal = show ? (
    <div onClick={()=>handleClose()} className={`overflow-hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50  flex justify-center items-center`}>
      <div className='w-[50%] h-[50%] bg-white'>

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

export default IssueModal