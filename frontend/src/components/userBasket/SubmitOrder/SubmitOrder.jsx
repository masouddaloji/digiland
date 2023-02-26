import React from 'react'
import { Link } from 'react-router-dom'
import './SubmitOrder.css'

function SubmitOrder() {
  return (
    <div className='submitOrder'>
        <ul className="submitOrder__details">
            <li className='submitOrder__item'>
                <span>شماره سفارش : </span>
                <strong>3619212</strong>
            </li>
            <li className='submitOrder__item'>
                <span>تاریخ : </span>
                <strong>3619212</strong>
            </li>
            <li className='submitOrder__item'>
                <span>قیمت نهایی : </span>
                <bdi class="productPrice">
                            500,000
                            <span class="toman">تومان</span>
                          </bdi>
            </li>
        </ul>
        <div className="submitOrder__btns">
            <Link to="/" className="submitOrder__btn submitOrder__btn--submit">پرداخت</Link>
            <Link to="/basket/check-information" className="submitOrder__btn submitOrder__btn--return">بازگشت</Link>
        </div>
    </div>
  )
}

export default SubmitOrder