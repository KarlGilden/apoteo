import React, { useState } from 'react'
import IssueItem from '../components/IssueItem';
import IssueModal from '../components/IssueModal'
import LogNumInput from '../components/LogNumInput'

const NewLog = () => {

    const [showModal, setShowModal] = useState(false);

    const [data, setData] = useState({
        covid: 0,
        discharge: 0,
        outp: 0,
        gp: 0,
        ed: 0,
        paediatric: 0,
        eylea: 0,
        bicillin: 0,
        ferinject: 0,
        binocrit: 0,
        blisterPacks: 0,
        aclasta: 0,
        compounding: 0,
        yellowCards: 0
    })

    const openModal = () => {
        setShowModal(true)
        document.querySelector('body')?.classList.add('overflow-hidden')
    }

    const closeModal = () => {
        setShowModal(false)
        document.querySelector('body')?.classList.remove('overflow-hidden')
    }

    const [issues, setIssues] = useState([
        {
            title: "Example 1",
            description: "blah blah blah",
            tags: "tag1,tag2,tag3"
        },
        {
            title: "Example 2",
            description: "blah blha blah",
            tags: "a,b,b"
        }
    ])

    const onValueChange = (key:string, value:string) => {
        setData({ ...data, [key]: value })
    }

    const handleSubmit = async () => {
        await fetch('/api/logs', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

  return (
    <>
    <div className={`h-[72px] w-full bg-secondary `}></div>
    <IssueModal show={showModal} handleClose={()=>closeModal()}/>
    <div className='h-screen'>
        <div className='w-full bg-primary p-10 flex flex-col justify-between'>
            <div className='flex flex-col sm:flex-row h-full'>
                <div className='flex flex-col sm:flex-row w-full items-center mb-10 sm:items-start'>
                    <div className='w-full'>
                        <LogNumInput name="Discharge" inputKey="discharge" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Out Patient" inputKey="outp" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="GP" inputKey="gp" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="ED" inputKey="ed" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Paediatric" inputKey="paediatric" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Eylea" inputKey="eylea" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Bicillin" inputKey="bicillin" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Ferinject" inputKey="ferinject" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Binocrit" inputKey="binocrit" onValueChange={onValueChange}/>
                    </div>
                    <div className='p-1'></div>
                    <div className='w-full'>
                        <LogNumInput name="Blister Packs" inputKey="blisterPacks" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Aclasta" inputKey="aclasta" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Covid" inputKey="covid" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Compounding" inputKey="compounding" onValueChange={onValueChange}/>
                        <div className='p-1'></div>
                        <LogNumInput name="Yellow Cards" inputKey="yellowCards" onValueChange={onValueChange}/>
                    </div>
                </div>
                <div className='p-1'></div>
                <div className='flex flex-col w-full'>
                    <div className='w-full h-full '>
                        
                        <div className='w-full bg-secondary p-3'>
                            <h2 className=''>Issues</h2>
                        </div>

                        {issues.map(value=>{
                            return(
                                <IssueItem value={value}/>
                            )
                        })}

                        <div className='m-3 text-center'>
                            <button onClick={()=>{openModal()}} className='p-3 w-[90%] hover:bg-primary-light bg-primary-dark rounded-md text-white'>New issue +</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center mt-10'>
                <button onClick={()=>{handleSubmit()}} className='p-3 bg-secondary w-full sm:w-[50%]'>Submit</button>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default NewLog