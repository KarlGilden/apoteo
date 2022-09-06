import { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import DatesChanger from '../../components/Dashboard/DatesChanger';
import HistoryList from '../../components/History/HistoryList';

const History: NextPage = () => {
    const {data: session} = useSession();
    const [dateFrom, setDateFrom] = useState("2022-09-01")
    const [dateTo, setDateTo] = useState("2022-09-30")
    const [entries, setEntries] = useState([])

    useEffect(()=>{
        getData()
    }, [dateFrom, dateTo])

    const getData = async () => {
        await fetch(`/api/history/${dateFrom}/${dateTo}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
          })
        .then(response => {
            if(!response.ok){
              throw new Error("error")
            }
            else{
              return response.json()
            }
          })
          .then(d => {
              console.log(d)
              setEntries(d)
          })
          .catch(e => {
            console.log(e)
          })
    }

  return (
    <>
        <div className={`h-[72px] w-full`}></div>
       {session ? 
       <div>
            <div className='w-full flex flex-col items-center'>
                <h1 className='text-5xl p-5'>History</h1>
                <DatesChanger dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo}/>
            </div>
            <HistoryList entries={entries}/>
            <div className='p-5'></div>
       </div>
       :
        <div className='flex justify-center'>
            <h1 className='text-5xl'>Please log in</h1>
        </div>
        } 
    </>
  )
}

export default History