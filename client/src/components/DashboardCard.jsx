import React from 'react'

const DashboardCard = ({ count, title, icon, color, bcg }) => {
  return (
    <div className="main__card" style={{borderBottom:`5px solid ${color}`}}>
            <div className="header p-4" >
              <span className='count' style={{color:color}}>{count}</span>
              <span className='icon' style={{background: bcg,fontSize:'30px'}}>{icon}</span>
            </div>
            <h5 className='title'>{title}</h5>
    </div>
  )
}

export default DashboardCard