import React from 'react'
import { Link } from 'react-router-dom';

const TitleKomunitas = () => {
  return (
    <div><Link to="/cari-teman/" className="text-blue-500">
    Kembali
  </Link>
    <div className='text-3xl font-bold'>Semua <span className='text-blue-400'>Komunitas</span></div>
    </div>
  )
}

export default TitleKomunitas