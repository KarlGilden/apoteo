import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
interface IProps {
  show:boolean,
  handleClose:()=>void,
  errors: any[],
  setErrors: (issue:any)=>void
  index: number
}

type Issue = {
  title:string,
  description:string,
  tags: string
}

const EditErrorModal = ({show, handleClose, errors, setErrors, index}:IProps) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [issueTitle, setIssueTitle] = useState(errors[index].title)
  const [issueDesc, setIssueDesc] = useState(errors[index].description)
  const [issueTags, setIssueTags] = useState<string[]>(errors[index].tags.split(','))
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
        console.log(issueTags)
      var newError:Issue = {
        title: issueTitle,
        description: issueDesc,
        tags: issueTags.join()
      }
      let tempErrors = [...errors]
      tempErrors[index] = newError

      setErrors(tempErrors)
      handleClose()
    }
  }

  const handleDelete = () => {
    let tempErrors = errors.filter(item => item !== errors[index])
    setErrors(tempErrors)
    handleClose()
  }

  const closeModal = () => {
    handleClose()
  }

  useEffect(()=>{
    setIsBrowser(true)
  },[])

  const modal = show ? (
    <div className={`overflow-hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50  flex justify-center items-center`}>
      <div className='max-w-[600px] w-[90%] h-[90%] bg-white p-5 rounded-sm flex flex-col justify-between'>

        <div className='flex justify-between items-center'>
            <div className='flex items-center '>
                <h1 className=' text-4xl'>Edit Error</h1>
                <div className='p-2'></div>
                <button className='text-white bg-red p-1 rounded-md' onClick={()=>handleDelete()}>Delete</button>
            </div>
            <p className='text-2xl' onClick={()=>closeModal()}>close</p>
        </div>

        <div>
          <label htmlFor="">Title:</label>
          <input 
            onChange={(e)=>setIssueTitle(e.target.value)} 
            value={issueTitle}
            type="text" 
            className='w-full border-off-white focus:outline-none focus:bg-off-white focus:border-[#111] text-dark-green rounded-md border-[2px] p-1 bg-transparent' 
            />
          <div className='h-full'>
            <label className='text-dark-green mb-1' htmlFor="">Description:</label>
            <textarea 
                value={issueDesc} 
                className='w-full h-full max-h-[100px] resize-none border-off-white focus:outline-none focus:bg-off-white focus:border-[#111] text-dark-green rounded-md border-[2px] p-1 bg-transparent' 
                onChange={(e)=>setIssueDesc(e.target.value)}>
            </textarea>
          </div>
        </div>

        <div className='flex flex-wrap m-5'>
          <p className={`text-sm px-1 py-[2px] m-1 cursor-pointer border-2 rounded-md ${issueTags.includes('Incident') ? 'bg-secondary text-white border-secondary' : 'bg-transparent border-off-white'}`} onClick={()=>toggleTags('Incident')}>Incidents</p>
          <p className={`text-sm px-1 py-[2px] m-1 cursor-pointer border-2 rounded-md ${issueTags.includes('Near miss') ? 'bg-secondary text-white border-secondary' : 'bg-transparent border-off-white'}`} onClick={()=>toggleTags('Near miss')}>Near Miss</p>
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

export default EditErrorModal

