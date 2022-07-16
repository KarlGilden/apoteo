import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import FormInput from './FormInput'
interface IProps {
  show:boolean,
  handleClose:()=>void,
  issues: any[],
  setIssues: (issue:any)=>void

}

type Issue = {
  title:string,
  description:string,
  tags: string
}

const IssueModal = ({show, handleClose, issues, setIssues}:IProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  const [issueTitle, setIssueTitle] = useState("")
  const [issueDesc, setIssueDesc] = useState("")
  const [issueTags, setIssueTags] = useState<string[]>([])
  const [error, setError] = useState("")

  const toggleTags = (tag:string) =>{
    if(issueTags.includes(tag)){
      setIssueTags(issueTags.filter(t=>t!=tag))
    }else{
      setIssueTags([...issueTags, tag])
    }
  }

  const handleSubmit = () => {
    setError("")
    if( issueTitle.length < 1 || issueDesc.length < 1){
      setError("Please fill all fields")
    }else{
      var newIssue:Issue = {
        title: issueTitle,
        description: issueDesc,
        tags: issueTags.join()
      }
  
      setIssues([...issues, newIssue])
      handleClose()
    }
  }

  const closeModal = () => {
    setError("")
    setIssueTags([])
    setIssueTitle("")
    setIssueDesc("")
    handleClose()
  }

  useEffect(()=>{
    setIsBrowser(true)
  },[])

  const modal = show ? (
    <div className={`overflow-hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50  flex justify-center items-center`}>
      <div className='w-[90%] h-[90%] bg-primary p-5 rounded-md'>

        <div className='flex justify-between items-center'>
          <h1 className='text-white text-4xl'>New Issue</h1>
          <p className='text-2xl' onClick={()=>closeModal()}>close</p>
        </div>

        <FormInput setFormState={setIssueTitle} type={'text'} label={'Title'} />
        <FormInput setFormState={setIssueDesc} type={'text'} label={'Description'} />

        <div className='flex m-5'>
          <p className={`${issueTags.includes('Tag1') ? 'text-secondary' : 'text-white'}`} onClick={()=>toggleTags('Tag1')}>Tag1</p>
          <p className={`${issueTags.includes('Tag2') ? 'text-secondary' : 'text-white'}`} onClick={()=>toggleTags('Tag2')}>Tag2</p>
          <p className={`${issueTags.includes('Tag3') ? 'text-secondary' : 'text-white'}`} onClick={()=>toggleTags('Tag3')}>Tag3</p>
        </div>

        <button onClick={()=>{handleSubmit(); }} className='p-3 bg-secondary w-full'>Submit</button>
        {error}

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