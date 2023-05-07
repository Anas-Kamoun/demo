import React from 'react'
import "./css/Dashcss.css";
import Tabverticalbar from "./Tabverticalbar"
function Cardeverticalbar({ title,  }) {
  return (
    <div>
      <div className='carte-vertical-bar'>
        <Tabverticalbar title={title}  />
      </div>
    </div>
  )
}

export default Cardeverticalbar