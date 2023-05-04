import React from 'react'

function Carte({title, icon, data}) {
  console.log('data',data)
  return (

    <div >
      <div className='carte'>
        <div className='fix-carte'>
        {icon}
        </div>
        <div className='fix-texte'>
        {data}

        <p>{title}</p> 
        </div>
        </div>
    </div>
  )
}

export default Carte