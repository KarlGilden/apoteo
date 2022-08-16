import React, { useEffect, useState } from 'react'
import DatesChanger from './DatesChanger';

const DashboardContainer = () => {
  const [dateFrom, setDateFrom] = useState("2022-08-01")
  const [dateTo, setDateTo] = useState("2022-08-30")

  const [data, setData] = useState({
    sumAll: 0,
    sumDischarge: 0,
    sumEd: 0,
    sumGp: 0,
    sumOutp: 0
  });

  useEffect(()=>{
    getData()
  }, [dateFrom, dateTo])

  const getData = async () => {
    await fetch('/api/logs/sum/' + `${dateFrom}/${dateTo}`, {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json())
    .then(d => {
        console.log(d)
        setData(d)
    })
  }

  return (
    <div className='bg-white p-5 md:col-span-2'>
        <DatesChanger dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo}/>
        <div className='p-2'></div>
        <h2 className='text-3xl text-dark-green'>Total scripts: {data?.sumAll}</h2>
        <div className='flex flex-wrap justify-between mt-6'>
          <h3 className='text-xs sm:text-base text-dark-green'>Discharge: {data?.sumDischarge}</h3>
          <h3 className='text-xs sm:text-base text-dark-green'>Out Patient: {data?.sumOutp}</h3>
          <h3 className='text-xs sm:text-base text-dark-green'>GP: {data?.sumGp}</h3>
          <h3 className='text-xs sm:text-base text-dark-green'>ED: {data?.sumEd}</h3>
        </div>
    </div>
  )
}

export default DashboardContainer