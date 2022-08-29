import React from 'react'

interface IProps{

}

const IssueItem = (props:any) => {
  return (
    <div className='w-full p-3 border-primary-dark bg-light-grey border-b-[1px] border-primary-dark flex items-center justify-between'>
        <p>{props.value.title}</p>
        <div className='flex flex-wrap'>
            {props.value.tags.split(',').map((tag:string, index:number) => {
                return (
                    <p key={index} className='m-1 p-1 border-[1px] rounded-md'>{tag}</p>
                )
            })}
        </div>
    </div>
  )
}

export default IssueItem