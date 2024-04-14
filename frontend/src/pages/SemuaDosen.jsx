import React from 'react'
import TitleDosen from '../components/cariTeman/SemuaDosen/titleDosen'
import CardSemuaDosen from '../components/cariTeman/SemuaDosen/semuaDosen'

const SemuaDosen = () => {
    return (
        <div className='grid grid-cols-3 gap-4 mt-4'>
        <div className='m-8 flex flex-col justify-center max-w-lg'>
          <TitleDosen/>
          <CardSemuaDosen/>
          </div>
    </div>        
    )
}

export default SemuaDosen