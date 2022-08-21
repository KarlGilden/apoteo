import React from 'react'

interface IProps{
    setDateFrom: React.Dispatch<React.SetStateAction<any>>,
    setDateTo: React.Dispatch<React.SetStateAction<any>>,
    dateFrom: string,
    dateTo: string
}

const DatesChanger = ({dateFrom, dateTo, setDateFrom, setDateTo}:IProps) => {

  return (
    <div className='flex items-center'>
        <input 
            type="date" 
            className='rounded-sm px-1 bg-secondary text-white'
            value={dateFrom}
            onChange={(e)=>{
                setDateFrom(e.target.value)
            }} 
        />
        <p className='mx-3 text-dark-green'>to</p>
        <input 
            type="date" 
            className='rounded-sm px-1 bg-secondary text-white'
            value={dateTo}
            onChange={(e)=>{
                setDateTo(e.target.value)
            }} 
        />   
    </div>
  )
}

export default DatesChanger