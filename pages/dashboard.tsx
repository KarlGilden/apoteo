import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { GetServerSideProps, InferGetStaticPropsType, NextPage } from 'next'
import DashboardContainer from '../components/Dashboard/DashboardContainer'
import { LogData } from '../types/Log'
import InterventionsContainer from '../components/Dashboard/InterventionsContainer'
import ErrorContainer from '../components/Dashboard/ErrorContainer'

const Dashboard: NextPage  = ()=> {
    const {data: session} = useSession();

    return(        
        <>
        <div className={`h-[72px] w-full bg-transparent`}></div>

        {session ? 
            <div className=' bg-off-white p-5 grid grid-cols-1 gap-5 auto-rows-min md:grid-cols-2'>
                <DashboardContainer/>
                <InterventionsContainer/>
                <ErrorContainer/>
            </div>
        :
            <div className='flex justify-center'>
                <h1 className='text-5xl'>Please log in</h1>
            </div>
        }

        </>
    )
}

export default Dashboard
