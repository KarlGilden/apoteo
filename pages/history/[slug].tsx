import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';

const Entry = () => {
  const {data: session} = useSession();
  const [entry, setEntry] = useState<any>();
  const router = useRouter()
  const { slug } = router.query


  useEffect(()=>{
    getData()
  }, [slug])

  const getData = async () => {
    if(slug){
      await fetch(`/api/logs/getSingle/${slug}`)
      .then(res => res.json())
      .then(data => {
        setEntry(data)
      })
    }
  }

  return (
    <>
      <div className={`h-[72px] w-full`}></div>
      {session ? 
        <div>
          {entry?.date}
        </div>
      :
      <div className='flex justify-center'>
        <h1 className='text-5xl'>Please log in</h1>
      </div>
      }
    </>
  )
}

export default Entry