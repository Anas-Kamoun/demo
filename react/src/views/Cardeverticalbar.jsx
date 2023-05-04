import React from 'react'
import "./css/Dashcss.css";
import Tabverticalbar from "./Tabverticalbar"
function Cardeverticalbar({ title, api, api2, api3 }) {
  return (
    <div>
      <div className='carte-vertical-bar'>
        <Tabverticalbar title={title} api={api} api2={api2} api3={api3} />
      </div>
    </div>
  )
}

export default Cardeverticalbar