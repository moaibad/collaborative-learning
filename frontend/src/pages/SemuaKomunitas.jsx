import React from 'react'
import TitleKomunitas from '../components/cariTeman/SemuaKomunitas/titleKomunitas'
import CardSemuaKomunitas from '../components/cariTeman/SemuaKomunitas/semuaKomunitas'

const SemuaKomunitas = () => {
    return (
        <div className='grid grid-cols-3 gap-4 mt-4'>
        <div className='m-8 flex flex-col justify-center max-w-lg'>
          <TitleKomunitas/>
          <CardSemuaKomunitas/>
          </div>
    </div>        
    )
}

export default SemuaKomunitas