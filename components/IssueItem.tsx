import React from 'react'

interface IProps{

}

const IssueItem = (props:any) => {
  return (
    <div className='w-full p-3 text-white border-primary-dark bg-primary-light border-b-[1px] border-primary-dark flex items-center justify-between'>
        <p>{props.value.title}</p>
        <div className='flex'>
            {props.value.tags.split(',').map((tag:string, index:number) => {
                return (
                    <p key={index} className='m-1 border-[1px] border-white rounded-md text-white'>{tag}</p>
                )
            })}
        </div>
    </div>
  )
}

export default IssueItem