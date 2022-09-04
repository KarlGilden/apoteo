import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import FormInput from './FormInput'
interface IProps {
  show:boolean,
  handleClose:()=>void,
  interventions: any[],
  setInterventions: (issue:any)=>void

}

type Issue = {
  title:string,
  description:string,
  tags: string
}

const AddInterventionModal = ({show, handleClose, interventions, setInterventions}:IProps) => {
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

      setIssueTags([""])
      setInterventions([...interventions, newIssue])
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
      <div className='max-w-[600px] w-[90%] h-[90%] bg-white p-5 rounded-sm flex flex-col justify-between'>

        <div className='flex justify-between items-center'>
          <h1 className=' text-4xl'>New Intervention</h1>
          <p className='text-2xl' onClick={()=>closeModal()}>close</p>
        </div>

        <div>
          <FormInput setFormState={setIssueTitle} type={'text'} label={'Title'} />
          <div className='h-full'>
            <label className='text-dark-green mb-1' htmlFor="">Description:</label>
            <textarea className='w-full h-full max-h-[100px] resize-none border-off-white focus:outline-none focus:bg-off-white focus:border-[#111] text-dark-green rounded-md border-[2px] p-1 bg-transparent' onChange={(e)=>setIssueDesc(e.target.value)} ></textarea>
          </div>
        </div>

        <div className='flex flex-wrap m-5'>
          <p className={`text-sm px-1 py-[2px] m-1 cursor-pointer border-2 rounded-md ${issueTags.includes('Improved serious harm') ? 'bg-secondary text-white border-secondary' : 'bg-transparent border-off-white'}`} onClick={()=>toggleTags('Improved serious harm')}>Improved serious harm</p>
          <p className={`text-sm px-1 py-[2px] m-1 cursor-pointer border-2 rounded-md ${issueTags.includes('Improved harm') ? 'bg-secondary text-white border-secondary' : 'bg-transparent border-off-white'}`} onClick={()=>toggleTags('Improved harm')}>Improved harm</p>
          <p className={`text-sm px-1 py-[2px] m-1 cursor-pointer border-2 rounded-md ${issueTags.includes('Improved efficacy') ? 'bg-secondary text-white border-secondary' : 'bg-transparent border-off-white'}`} onClick={()=>toggleTags('Improved efficacy')}>Improved efficacy</p>
          <p className={`text-sm px-1 py-[2px] m-1 cursor-pointer border-2 rounded-md ${issueTags.includes('Improved compliance') ? 'bg-secondary text-white border-secondary' : 'bg-transparent border-off-white'}`} onClick={()=>toggleTags('Improved compliance')}>Improved compliance</p>
          <p className={`text-sm px-1 py-[2px] m-1 cursor-pointer border-2 rounded-md ${issueTags.includes('Incomplete / illegible') ? 'bg-secondary text-white border-secondary' : 'bg-transparent border-off-white'}`} onClick={()=>toggleTags('Incomplete / illegible')}>Incomplete / illegible</p>
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

export default AddInterventionModal