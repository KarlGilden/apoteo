import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { GetServerSideProps, InferGetStaticPropsType, NextPage } from 'next'
import DashboardContainer from '../components/DashboardContainer'

const Dashboard: NextPage  = ()=> {

    return(        
        <>
        <div className={`h-[72px] w-full bg-secondary `}></div>
        <div className='h-screen bg-primary p-10'>
            <DashboardContainer/>
        </div>
        </>
    )
}

export default Dashboard