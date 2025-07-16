import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ width = '150px' }) {
  return (
    <Link to={"/"}>
    <div style={{ width }}>
      <h5 className="text-2xl font-bold font-[Inter] text-white">
        Curio<span className='text-rose-400'>Hive</span>
      </h5>
    </div>
    </Link>
  )
}

export default Logo
