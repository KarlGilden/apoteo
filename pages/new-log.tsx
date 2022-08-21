import React, { useState } from 'react'
import IssueItem from '../components/IssueItem';
import IssueModal from '../components/IssueModal'
import LogNumInput from '../components/LogNumInput'
import Router from "next/router";
import { Issue } from '../types/Log';
import { useSession } from 'next-auth/react';

const NewLog = () => {
    const {data: session} = useSession();
    const [showModal, setShowModal] = useState(false);
    const [logObj, setLogObj] = useState({
        date: new Date().toLocaleDateString('en-CA'),
        data: {},
        issues: [
            {}
        ],
        sum:0
    })

    const [issues, setIssues] = useState<Issue[]>([

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

    const openModal = () => {
        setShowModal(true)
        document.querySelector('body')?.classList.add('overflow-hidden')
    }

    const closeModal = () => {
        setShowModal(false)
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

    const handleSubmit = async () => {
        data.discharge.sum = sum(data.discharge);
        data.outp.sum = sum(data.outp);
        data.gp.sum = sum(data.gp);
        data.ed.sum = sum(data.ed);

        logObj.data = data

        logObj.sum = sumAll(data)

        logObj.issues = issues
        console.log(logObj)
        await fetch('/api/logs/add', {
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
    <IssueModal issues={issues} setIssues={setIssues} show={showModal} handleClose={()=>closeModal()}/>
    <div className='bg-primary'>
        <div className='w-full max-w-[600px] m-auto bg-primary p-10 flex flex-col justify-between'>
        <div>
            <input 
            value={logObj.date} 
            className='bg-transparent text-white text-xl' 
            type="date"
            onChange={(e)=>setLogObj({ ...logObj, date: e.target.value })}
            />
        </div>
        <div className='p-3'></div>
            <div className='flex flex-col h-full'>
                <div className='flex flex-col sm:flex-row w-full items-center mb-10 sm:items-start'>
                    <div className='w-full'>

                        <div>
                            <p className='text-white'>Discharge</p>
                            <hr className='text-white mb-1' />
                            <div className='flex justify-between w-full sm:w-full items-center'>
                                <label className='text-sm text-white' htmlFor="">Regular:</label>
                                <input className='py-2 px-1' type="number" onChange={(e)=>{setData({...data, discharge: {...data.discharge, other: parseInt(e.target.value)}})}}/>
                            </div>
                            <div className='p-1'></div> 
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Blister Packs:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, discharge: {...data.discharge, blisterPacks: parseInt(e.target.value)}})}}/>
                            </div>
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Yellow Cards:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, discharge: {...data.discharge, yellowCards: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Compounding:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, discharge: {...data.discharge, compounding: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Paediatrics:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, discharge: {...data.discharge, paediatric: parseInt(e.target.value)}})}}/>
                            </div>                       
                        </div>

                        <div className='p-3'></div>

                        <div>
                            <p className='text-white'>Out Patient</p>
                            <hr className='text-white mb-1' />

                            <div className='flex justify-between w-full sm:w-full  items-center'>
                                <label className='text-sm text-white' htmlFor="">Regular:</label>
                                <input className='py-2 px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, other: parseInt(e.target.value)}})}}/>
                            </div>      
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Blister Packs:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, blisterPacks: parseInt(e.target.value)}})}}/>
                            </div>
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Yellow Cards:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, yellowCards: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Compounding:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, compounding: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Paediatrics:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, paediatric: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Aclasta:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, aclasta: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Bicillin:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, bicillin: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Binocrit:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, binocrit: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Eylea:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, eylea: parseInt(e.target.value)}})}}/>
                            </div> 
                            <div className='p-1'></div> 
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Ferinject:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, outp: {...data.outp, ferinject: parseInt(e.target.value)}})}}/>
                            </div>   
                        </div>

                        <div className='p-3'></div>

                        <div>

                            <p className='text-white'>GP</p>
                            <hr className='text-white mb-1' />

                            <div className='flex justify-between w-full sm:w-full  items-center'>
                                <label className='text-sm text-white' htmlFor="">Regular:</label>
                                <input className='py-2 px-1' type="number" onChange={(e)=>{setData({...data, gp: {...data.gp, other: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Blister Packs:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, gp: {...data.gp, blisterPacks: parseInt(e.target.value)}})}}/>
                            </div>
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Yellow Cards:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, gp: {...data.gp, yellowCards: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Compounding:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, gp: {...data.gp, compounding: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Paediatrics:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, gp: {...data.gp, paediatric: parseInt(e.target.value)}})}}/>
                            </div>  
                         </div>

                        <div className='p-3'></div>

                        <div>
                            <p className='text-white'>ED</p>
                            <hr className='text-white mb-1' />

                            <div className='flex justify-between w-full sm:w-full items-center'>
                                <label className='text-sm text-white' htmlFor="">Regular:</label>
                                <input className='py-2 px-1' type="number" onChange={(e)=>{setData({...data, ed: {...data.ed, other: parseInt(e.target.value)}})}}/>
                            </div> 
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Blister Packs:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, ed: {...data.ed, blisterPacks: parseInt(e.target.value)}})}}/>
                            </div>
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Yellow Cards:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, ed: {...data.ed, yellowCards: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Compounding:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, ed: {...data.ed, compounding: parseInt(e.target.value)}})}}/>
                            </div>  
                            <div className='p-1'></div>
                            <div className='flex justify-between w-full sm:w-full'>
                                <label className='text-sm text-white' htmlFor="">Paediatrics:</label>
                                <input className='px-1' type="number" onChange={(e)=>{setData({...data, ed: {...data.ed, paediatric: parseInt(e.target.value)}})}}/>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className='p-1'></div>
                <div className='flex flex-col w-full'>
                    <div className='w-full h-full '>

                        <div className='w-full bg-secondary p-3'>
                            <h2 className=''>Issues</h2>
                        </div>

                        {issues.length > 0 && issues.map((value, index)=>{
                            return(
                                <IssueItem key={index} value={value}/>
                            )
                        })}

                        <div className='m-3 text-center'>
                            <button onClick={()=>{openModal()}} className='p-3 w-[90%] hover:bg-primary-light bg-primary-dark rounded-md text-white'>New issue +</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-full mt-10'>
                <button onClick={()=>{handleSubmit()}} className='p-3 bg-secondary w-full '>Submit</button>
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