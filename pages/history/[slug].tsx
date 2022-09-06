import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';

const Entry = () => {
  const {data: session} = useSession();

  const router = useRouter()
  const { slug } = router.query


  useEffect(()=>{

  }, [])

  const getData = async () => {
    
  }

  return (
    <>
      <div className={`h-[72px] w-full`}></div>
      {session ? 
        <div>
          {slug}
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