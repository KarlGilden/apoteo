import React from 'react'
import { useSession } from "next-auth/react"

const Dashboard = () => {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    if (typeof window !== 'undefined' && loading) return null
    if (!session) { return  <p>Unauthed</p> }

  
    return <p>Success</p>
}

export default Dashboard