import React, { useEffect, useState } from 'react'

const InterventionsContainer = () => {
    const [interventionsSum, setInterventionsSum] = useState(0)
    useEffect(()=>{
        getData()
      }, [])
      const getData = async () => {
        await fetch('/api/logs/interventions', {
          method: 'GET',
          headers: {"Content-Type": "application/json"}
        }).then(response => response.json())
        .then(d => {
            console.log(d)
            setInterventionsSum(d)
        })
      }
  return (
    <div className='bg-primary-light p-10 w-[50%]'>
        <div className=''>
            <h2 className='text-3xl text-white'>Interventions</h2>
            <p className='text-white'>Total interventions: {interventionsSum}</p>
        </div>
    </div>
  )
}

export default InterventionsContainer