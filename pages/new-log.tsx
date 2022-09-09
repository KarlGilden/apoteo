import React, { useState } from 'react'
import IssueItem from '../components/IssueItem';
import IssueModal from '../components/AddInterventionModal'
import LogNumInput from '../components/LogNumInput'
import Router from "next/router";
import { Issue } from '../types/Log';
import { useSession } from 'next-auth/react';
import AddInterventionModal from '../components/AddInterventionModal';
import AddErrorModal from '../components/AddErrorModal';
import ScriptInput from '../components/ScriptInput';
import { sum, sumAll } from '../util/functions';

const NewLog = () => {

    const {data: session} = useSession();

    // Modal state
    const [showInterventionsModal, setShowInterventionsModal] = useState(false);
    const [showErrorsModal, setShowErrorsModal] = useState(false);

    // Entry obj state
    const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'))
    const [interventions, setInterventions] = useState<Issue[]>([])
    const [errors, setErrors] = useState<Issue[]>([])

    const [data, setData] = useState({
        discharge: {
            compounding: 0,
            yellowCards: 0,
            blisterPacks: 0,
            paediatric: 0,
            other: 0,
            sum: 0
        },
        outp: {
            eylea: 0,
            bicillin: 0,
            ferinject: 0,
            binocrit: 0,
            aclasta: 0,
            compounding: 0,
            yellowCards: 0,
            blisterPacks: 0,
            paediatric: 0,
            other: 0,
            sum: 0
        },
        gp: {
            compounding: 0,
            yellowCards: 0,
            blisterPacks: 0,
            paediatric: 0,
            other: 0,
            sum: 0
        },
        ed: {
            compounding: 0,
            yellowCards: 0,
            blisterPacks: 0,
            paediatric: 0,
            other: 0,
            sum: 0
        }
    })

    const openInterventionModal = () => {
        setShowInterventionsModal(true)
        document.querySelector('body')?.classList.add('overflow-hidden')
    }

    const closeInterventionModal = () => {
        setShowInterventionsModal(false)
        document.querySelector('body')?.classList.remove('overflow-hidden')
    }

    const openErrorModal = () => {
        setShowErrorsModal(true)
        document.querySelector('body')?.classList.add('overflow-hidden')
    }

    const closeErrorModal = () => {
        setShowErrorsModal(false)
        document.querySelector('body')?.classList.remove('overflow-hidden')
    }

    // handle onChange for custom script inputs
    const onScriptChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.id]: {...data[e.target.id as keyof typeof data], [e.target.name]: e.target.value}})
    }

    // format obj to store in db
    const handleSubmit = async () => {

        // sum all scripts data
        data.discharge.sum = sum(data.discharge);
        data.outp.sum = sum(data.outp);
        data.gp.sum = sum(data.gp);
        data.ed.sum = sum(data.ed);

        const entry = {
            date: date,
            data: data,
            interventions: interventions,
            errors: errors,
            sum: sumAll(data)
        }

        console.log(entry)
        // await fetch('/api/entries/add', {
        //     method: 'PUT',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(logObj)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     Router.push("/dashboard");
        // })
    }

  return (
    <>
    <div className={`h-[72px] w-full`}></div>
    {session ? 
    <>
    <AddInterventionModal interventions={interventions} setInterventions={setInterventions} show={showInterventionsModal} handleClose={()=>closeInterventionModal()}/>
    <AddErrorModal errors={errors} setErrors={setErrors} show={showErrorsModal} handleClose={()=>closeErrorModal()}/>

    <div className='bg-white'>
        <div className='w-full max-w-[600px] m-auto bg-white p-10 flex flex-col justify-between'>
        <div>
            <input 
            value={date} 
            className='bg-transparent text-xl' 
            type="date"
            onChange={(e)=>setDate(e.target.value)}
            />
        </div>
        <div className='p-3'></div>
            <div className='flex flex-col h-full'>
                <div className='flex flex-col sm:flex-row w-full items-center mb-10 sm:items-start'>
                    <div className='w-full'>
                        <div>
                            <p className='text-xl'>Discharge</p>
                            <hr className=' mb-1' />
                            <ScriptInput label="Regular" id="discharge" name='other' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div> 
                            <ScriptInput label="Blister Packs" id="discharge" name='blisterPacks' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div>
                            <ScriptInput label="Yellow Cards" id="discharge" name='yellowCards' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Compounding" id="discharge" name='compounding' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Paediatrics" id="discharge" name='paediatric' onScriptChange={onScriptChange}/>                     
                        </div>

                        <div className='p-3'></div>

                        <div>
                            <p className='text-xl'>Out Patient</p>
                            <hr className=' mb-1' />
                            <ScriptInput label="Regular" id="outp" name='other' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div> 
                            <ScriptInput label="Blister Packs" id="outp" name='blisterPacks' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div>
                            <ScriptInput label="Yellow Cards" id="outp" name='yellowCards' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Compounding" id="outp" name='compounding' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Paediatrics" id="outp" name='paediatric' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>
                            <ScriptInput label="Aclasta" id="outp" name='aclasta' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>
                            <ScriptInput label="Bicillin" id="outp" name='bicillin' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>
                            <ScriptInput label="Binocrit" id="outp" name='binocrit' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>
                            <ScriptInput label="Eylea" id="outp" name='eylea' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>   
                            <ScriptInput label="Ferinject" id="outp" name='ferinject' onScriptChange={onScriptChange}/>   
                        </div>

                        <div className='p-3'></div>

                        <div>
                            <p className='text-xl'>GP</p>
                            <hr className=' mb-1' />
                            <ScriptInput label="Regular" id="gp" name='other' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div> 
                            <ScriptInput label="Blister Packs" id="gp" name='blisterPacks' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div>
                            <ScriptInput label="Yellow Cards" id="gp" name='yellowCards' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Compounding" id="gp" name='compounding' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Paediatrics" id="gp" name='paediatric' onScriptChange={onScriptChange}/>  
                         </div>

                        <div className='p-3'></div>

                        <div>
                            <p className='text-xl'>ED</p>
                            <hr className=' mb-1' />
                            <ScriptInput label="Regular" id="ed" name='other' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div> 
                            <ScriptInput label="Blister Packs" id="ed" name='blisterPacks' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div>
                            <ScriptInput label="Yellow Cards" id="ed" name='yellowCards' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Compounding" id="ed" name='compounding' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Paediatrics" id="ed" name='paediatric' onScriptChange={onScriptChange}/>    
                        </div>
                    </div>
                </div>                
            </div>
            <div className='w-full mt-10'>
                <button onClick={()=>{handleSubmit()}} className='p-3 bg-secondary w-full text-white'>Submit</button>
            </div>
        </div>
    </div>
    </>
    :
    <>
        <div className='flex justify-center'>
            <h1 className='text-5xl'>Please log in</h1>
        </div>
    </>
    }
    
    </>
    
  )
}

export default NewLog