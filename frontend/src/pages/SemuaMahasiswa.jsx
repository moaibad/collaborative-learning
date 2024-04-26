import React from 'react'
import TitleMahasiswa from '../components/cariTeman/SemuaMahasiswa/titleMahasiswa'
import CardSemuaMahasiswa from '../components/cariTeman/SemuaMahasiswa/semuaMahasiswa'

const SemuaMahasiswa = () => {
    return (
        <div className='grid grid-cols-3 gap-4 mt-4'>
        <div className='m-8 flex flex-col justify-center max-w-lg'>
          <TitleMahasiswa/>
          <CardSemuaMahasiswa/>
          </div>
    </div>        
    )
}

export default SemuaMahasiswa