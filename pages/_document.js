import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='bg-primary'>
        <Main />
        <NextScript />
        <div id='modal-root'></div>
      </body>
    </Html>
  )
}