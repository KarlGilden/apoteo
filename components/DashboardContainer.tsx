import React, { useEffect, useState } from 'react'



const DashboardContainer = () => {
  const [data, setData] = useState({
    sumAll: 0,
    sumDischarge: 0,
    sumEd: 0,
    sumGp: 0,
    sumOutp: 0
  });

  useEffect(()=>{
    getData()
  }, [])
  const getData = async () => {
    await fetch('/api/logs/sum', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json())
    .then(d => {
        console.log(d)
        setData(d)
    })
  }

  return (
    <div className='bg-primary-light p-10'>
        <h2 className='text-3xl text-white'>Total scripts: {data?.sumAll}</h2>
        <div className='flex justify-between w-[50%] mt-6'>
          <h3 className='text-1xl text-white'>Discharge: {data?.sumDischarge}</h3>
          <h3 className='text-1xl text-white'>Out Patient: {data?.sumOutp}</h3>
          <h3 className='text-1xl text-white'>GP: {data?.sumGp}</h3>
          <h3 className='text-1xl text-white'>ED: {data?.sumEd}</h3>
        </div>
    </div>
  )
}

export default DashboardContainer