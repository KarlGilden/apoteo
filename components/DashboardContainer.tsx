import React, { useEffect, useState } from 'react'

const DashboardContainer = () => {

    const [data, setData] = useState<any>([])

    useEffect(()=>{
        getData()
    }, [])

    const getData = async () => {
        await fetch('/api/logs', {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setData(data)
        })  
    }

  return (
    <div className='bg-primary-light p-10'>
        {data}
    </div>
  )
}

export default DashboardContainer