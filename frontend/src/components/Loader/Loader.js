import React from 'react'
//styles
import './Loader.css'

const Loader = (props) => {
    const {message}=props
  return (
    <div className='loader__wrapper'>
        <div className="loder__box">
            <div className='loader'>
            <span style={{"--pos":1}}></span>
            <span style={{"--pos":2}}></span>
            <span style={{"--pos":3}}></span>
            <span style={{"--pos":4}}></span>
            <span style={{"--pos":5}}></span>
            <span style={{"--pos":6}}></span>
            <span style={{"--pos":7}}></span>
            <span style={{"--pos":8}}></span>
            <span style={{"--pos":9}}></span>
            <span style={{"--pos":10}}></span>
            <span style={{"--pos":11}}></span>
            <span style={{"--pos":12}}></span>
            <span style={{"--pos":13}}></span>
            <span style={{"--pos":14}}></span>
            <span style={{"--pos":15}}></span>
            {/* <span style={{"--pos":16}}></span>
            <span style={{"--pos":17}}></span>
            <span style={{"--pos":18}}></span>
            <span style={{"--pos":19}}></span>
            <span style={{"--pos":20}}></span> */}

            </div>
                <span className='loader__text'>{message}</span>
        </div>
    </div>
  )
}

export default Loader