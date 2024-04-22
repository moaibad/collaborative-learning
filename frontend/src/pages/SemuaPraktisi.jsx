import React from 'react'
import TitlePraktisi from '../components/cariTeman/SemuaPraktisi/titlePraktisi'
import CardSemuaPraktisi from '../components/cariTeman/SemuaPraktisi/semuaPraktisi'

const SemuaPraktisi = () => {
    return (
        <div className='grid grid-cols-3 gap-4 mt-4'>
        <div className='m-8 flex flex-col justify-center max-w-lg'>
          <TitlePraktisi/>
          <CardSemuaPraktisi/>
          </div>
    </div>        
    )
}

export default SemuaPraktisi