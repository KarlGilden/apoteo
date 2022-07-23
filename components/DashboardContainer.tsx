import React, { useEffect, useState } from 'react'



const DashboardContainer = ({}) => {

    const [data, setData] = useState<any>([])

    useEffect(()=>{
        getData()
    }, [])

    const getData = async () => {
        await fetch('/api/logs/sum', {
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
        <h2 className='text-3xl text-white'>Total scripts: {data}</h2>
    </div>
  )
}

export default DashboardContainer