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

const NewLog = () => {
    const {data: session} = useSession();
    const [showInterventionsModal, setShowInterventionsModal] = useState(false);
    const [showErrorsModal, setShowErrorsModal] = useState(false);
    const [logObj, setLogObj] = useState({
        date: new Date().toLocaleDateString('en-CA'),
        data: {},
        interventions: [
            {}
        ],
        errors: [
            {}
        ],
        sum:0
    })

    const [interventions, setInterventions] = useState<Issue[]>([

    ])

    const [errors, setErrors] = useState<Issue[]>([

    ])

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

    const sum = (obj:any) => {
        var sum = 0;
        for( var el in obj ) {
            if( obj.hasOwnProperty( el ) ) {
              sum += parseFloat( obj[el] );
            }
          }
          return sum;
    }

    const sumAll = (obj:any) => {
        var sum = 0;
        for( var el in obj ) {
            if( obj.hasOwnProperty( el ) ) {
              sum += parseFloat( obj[el].sum );
            }
          }
          return sum;
    }

    const onScriptChange = (value:number, type:string, script:string) => {
        if(type == 'discharge'){
            setData({...data, discharge: {...data.discharge, [script]: value}})
            return
        }
        if(type == 'outp'){
            setData({...data, outp: {...data.outp, [script]: value}})
            return
        }
        if(type == 'gp'){
            setData({...data, gp: {...data.gp, [script]: value}})
            return
        }
        if(type == 'ed'){
            setData({...data, ed: {...data.ed, [script]: value}})
            return
        }

    }

    const handleSubmit = async () => {
        data.discharge.sum = sum(data.discharge);
        data.outp.sum = sum(data.outp);
        data.gp.sum = sum(data.gp);
        data.ed.sum = sum(data.ed);

        logObj.data = data

        logObj.sum = sumAll(data)

        logObj.interventions = interventions
        logObj.errors = errors

        console.log(logObj)
        await fetch('/api/entries/add', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(logObj)
        })
        .then(response => response.json())
        .then(data => {
            Router.push("/dashboard");
        })
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
            value={logObj.date} 
            className='bg-transparent text-xl' 
            type="date"
            onChange={(e)=>setLogObj({ ...logObj, date: e.target.value })}
            />
        </div>
        <div className='p-3'></div>
            <div className='flex flex-col h-full'>
                <div className='flex flex-col sm:flex-row w-full items-center mb-10 sm:items-start'>
                    <div className='w-full'>
                        <div>
                            <p className='text-xl'>Discharge</p>
                            <hr className=' mb-1' />
                            <ScriptInput label="Regular" type="discharge" script='other' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div> 
                            <ScriptInput label="Blister Packs" type="discharge" script='blisterPacks' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div>
                            <ScriptInput label="Yellow Cards" type="discharge" script='yellowCards' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Compounding" type="discharge" script='compounding' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Paediatrics" type="discharge" script='paediatric' onScriptChange={onScriptChange}/>                     
                        </div>

                        <div className='p-3'></div>

                        <div>
                            <p className='text-xl'>Out Patient</p>
                            <hr className=' mb-1' />
                            <ScriptInput label="Regular" type="outp" script='other' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div> 
                            <ScriptInput label="Blister Packs" type="outp" script='blisterPacks' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div>
                            <ScriptInput label="Yellow Cards" type="outp" script='yellowCards' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Compounding" type="outp" script='compounding' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Paediatrics" type="outp" script='paediatric' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>
                            <ScriptInput label="Aclasta" type="outp" script='aclasta' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>
                            <ScriptInput label="Bicillin" type="outp" script='bicillin' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>
                            <ScriptInput label="Binocrit" type="outp" script='binocrit' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>
                            <ScriptInput label="Eylea" type="outp" script='eylea' onScriptChange={onScriptChange}/>   
                            <div className='p-1'></div>   
                            <ScriptInput label="Ferinject" type="outp" script='ferinject' onScriptChange={onScriptChange}/>   
                        </div>

                        <div className='p-3'></div>

                        <div>
                            <p className='text-xl'>GP</p>
                            <hr className=' mb-1' />
                            <ScriptInput label="Regular" type="gp" script='other' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div> 
                            <ScriptInput label="Blister Packs" type="gp" script='blisterPacks' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div>
                            <ScriptInput label="Yellow Cards" type="gp" script='yellowCards' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Compounding" type="gp" script='compounding' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Paediatrics" type="gp" script='paediatric' onScriptChange={onScriptChange}/>  
                         </div>

                        <div className='p-3'></div>

                        <div>
                            <p className='text-xl'>ED</p>
                            <hr className=' mb-1' />
                            <ScriptInput label="Regular" type="ed" script='other' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div> 
                            <ScriptInput label="Blister Packs" type="ed" script='blisterPacks' onScriptChange={onScriptChange}/>
                            <div className='p-1'></div>
                            <ScriptInput label="Yellow Cards" type="ed" script='yellowCards' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Compounding" type="ed" script='compounding' onScriptChange={onScriptChange}/> 
                            <div className='p-1'></div>
                            <ScriptInput label="Paediatrics" type="ed" script='paediatric' onScriptChange={onScriptChange}/>    
                        </div>
                    </div>
                </div>

                <div className='p-1'></div>

                {/* Interventions  */}
                <div className='flex flex-col w-full'>
                    <div className='w-full h-full '>

                        <div className='w-full bg-secondary p-3'>
                            <h2 className='text-white'>Interventions</h2>
                        </div>

                        {interventions.length > 0 && interventions.map((value, index)=>{
                            return(
                                <IssueItem key={index} value={value}/>
                            )
                        })}

                        <div className='m-3 text-center'>
                            <button onClick={()=>{openInterventionModal()}} className='p-3 w-[90%] hover:bg-off-white bg-light-grey rounded-md '>New issue +</button>
                        </div>

                    </div>
                </div>
                <div className='p-1'></div>
                {/* Errors  */}
                <div className='flex flex-col w-full'>
                    <div className='w-full h-full '>

                        <div className='w-full bg-secondary p-3'>
                            <h2 className='text-white'>Errors</h2>
                        </div>

                        {errors.length > 0 && errors.map((value, index)=>{
                            return(
                                <IssueItem key={index} value={value}/>
                            )
                        })}

                        <div className='m-3 text-center'>
                            <button onClick={()=>{openErrorModal()}} className='p-3 w-[90%] hover:bg-off-white bg-light-grey rounded-md '>New issue +</button>
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