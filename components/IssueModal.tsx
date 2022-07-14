import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import FormInput from './FormInput'
interface IProps {
  show:boolean,
  handleClose:()=>void,
  issues: any[],
  setIssues: (issue:Object)=>void

}

const IssueModal = ({show, handleClose, issues, setIssues}:IProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  const [issueTitle, setIssueTitle] = useState("")
  const [issueDesc, setIssueDesc] = useState("")
  const [issueTags, setIssueTags] = useState("")

  useEffect(()=>{
    setIsBrowser(true)
  },[])

  const modal = show ? (
    <div onClick={()=>handleClose()} className={`overflow-hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50  flex justify-center items-center`}>
      <div className='w-[90%] h-[90%] bg-primary p-5 rounded-md'>

        <div className='flex justify-between items-center'>
          <h1 className='text-white text-4xl'>New Issue</h1>
          <p className='text-2xl'>close</p>
        </div>

        <FormInput setFormState={()=>{setIssueTitle}} type={'text'} label={'Title'} />
        <FormInput setFormState={()=>{setIssueDesc}} type={'text'} label={'Description'} />
        <div>

        </div>
        <button className='p-3 bg-secondary w-full'>Submit</button>

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