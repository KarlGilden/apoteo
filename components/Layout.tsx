import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar';

type IProps = {
    children: React.ReactNode,
  };

const Layout = ({children}:IProps) => {
  return (
    <div>
    <Head>
      <title>Apoteo</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Navbar/>
        {children}
    </div>
  )
}

export default Layout