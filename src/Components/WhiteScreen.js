import React from 'react'

export default function WhiteScreen({whiteScreen}) {
  return (
    whiteScreen && <div className='white-screen h-100 w-100'>WhiteScreen</div>
  )
}
