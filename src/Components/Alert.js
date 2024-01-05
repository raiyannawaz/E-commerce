import React from 'react'

export default function Alert({alert}) {
  return (
    alert && <div className="alerts">
        <div className={`alert bg-${alert.type} py-0 px-3`}>
            <p className='m-0 fs-5 text-white d-flex align-items-center'>{alert.msg} {alert.sym}</p>
        </div>
    </div>
  )
}
