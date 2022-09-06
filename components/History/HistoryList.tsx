import React from 'react'
import HistoryItem from './HistoryItem'

interface IProps{
    entries: any[]
}

const HistoryList = ({entries}:IProps) => {
  return (
    <div className='m-auto w-full sm:w-[50%] flex flex-col items-center'>
        {entries.map((value:any, index)=> {
            return (
                <HistoryItem key={index} id={value._id} scripts={value.sum} date={value.date}/>
            )
        })}
</div>
  )
}

export default HistoryList