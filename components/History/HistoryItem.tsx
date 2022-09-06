import Link from 'next/link'
import React from 'react'

interface IProps{
    date: string,
    scripts: number,
    id: string
}

const HistoryItem = ({date, scripts, id}:IProps) => {
  return (
    <Link href={`/history/${encodeURIComponent(id)}`}>
      <div className='w-full p-5 flex items-center justify-between border-black border-b-[1px] hover:bg-off-white cursor-pointer'>
        <h1 className='text-xl'>{new Date(date).toLocaleDateString('en-GB')}</h1>
        <p className='w-[100px]'>Scripts: {scripts}</p>
      </div>
    </Link>

  )
}

export default HistoryItem