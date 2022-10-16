import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { NextPage } from 'next'
import DashboardContainer from '../components/Dashboard/DashboardContainer'
import InterventionsContainer from '../components/Dashboard/InterventionsContainer'
import ErrorContainer from '../components/Dashboard/ErrorContainer'
import DatesChanger from '../components/Dashboard/DatesChanger'
import { LineChart } from '../components/Dashboard/Charts/LineChart'


const Dashboard: NextPage  = ()=> {
    const {data: session} = useSession();
    const [dateFrom, setDateFrom] = useState(new Date(new Date().setDate(1)).toLocaleDateString('en-CA'))
    const [dateTo, setDateTo] = useState(new Date(new Date(new Date().setMonth(new Date().getMonth()+1)).setDate(0)).toLocaleDateString('en-CA'))
    // set start of current month
    // var monthStart = new Date();
    // monthStart.setDate(1)

    // // set end of current month
    // var monthEnd = new Date();
    // monthEnd.setMonth(monthEnd.getMonth()+1)
    // monthEnd.setDate(0)
    return(        
        <>
        <div className={`h-[72px] w-full bg-transparent`}></div>

        {session ? 
            <>
            <div className='bg-off-white p-5 pt-0'>
                <div className='px-5 py-6 sm:py-10'>
                    <h3 className='text-3xl sm:text-5xl  text-center sm:text-left'>Welcome back, {session.user?.name}</h3>
                    <div className='p-5'></div>
                    <DatesChanger dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo}/>
                </div>
                <div className='grid grid-cols-1 gap-5 auto-rows-min md:grid-cols-2'>
                    <DashboardContainer dateFrom={dateFrom} dateTo={dateTo}/>
                    <div className='bg-white sm:p-5'>
                        <LineChart dateFrom={dateFrom} dateTo={dateTo}/>
                    </div>
                    <InterventionsContainer dateFrom={dateFrom} dateTo={dateTo}/>
                    <ErrorContainer dateFrom={dateFrom} dateTo={dateTo}/>

                    
                </div>
            </div>
            </>
        :
            <div className='flex justify-center'>
                <h1 className='text-5xl'>Please log in</h1>
            </div>
        }

        </>
    )
}

export default Dashboard
