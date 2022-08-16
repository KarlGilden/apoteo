import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { GetServerSideProps, InferGetStaticPropsType, NextPage } from 'next'
import DashboardContainer from '../components/Dashboard/DashboardContainer'
import { LogData } from '../types/Log'
import InterventionsContainer from '../components/Dashboard/InterventionsContainer'
import ErrorContainer from '../components/Dashboard/ErrorContainer'

const Dashboard: NextPage  = ()=> {

    return(        
        <>
        <div className={`h-[72px] w-full bg-secondary`}></div>
        <div className=' bg-off-white p-5 grid grid-cols-1 gap-3 auto-rows-min md:grid-cols-2'>
            <DashboardContainer/>
            <InterventionsContainer/>
            <ErrorContainer/>
        </div>
        </>
    )
}

export default Dashboard
