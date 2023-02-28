import React from 'react'
import ItemBoxAPanel from '../ItemBoxAPanel/ItemBoxAPanel'


//import variables
import {adminPanelItems} from './../../../Constants'
// styles
import './MainAdmin.css'

const MainAdmin = () => {
  return (
    <section className="adminSection">
    <div className='container'>
      <div className="row">
      {adminPanelItems.map(item=>(
        <div className="col-sm-6 col-lg-4 col-xl-3" key={item.id}>
          <ItemBoxAPanel {...item}/>
        </div>
      ))}
      
      </div>
    </div>
    </section>
  )
}

export default MainAdmin