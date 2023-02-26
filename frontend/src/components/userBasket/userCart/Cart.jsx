import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {IoMdClose} from "react-icons/io"
import './Cart.css'

import { FaChevronLeft, FaShippingFast } from 'react-icons/fa'
import { CgChevronLeft } from 'react-icons/cg'
import ProductCount from '../../ProductCount/ProductCount'
function Cart() {
  const [count,setCount]=useState(1)
  const [price,setPrice]=useState(14500000)
  const [postPrice,setPostPrice]=useState(10000)
  return (
    <>
    <div className="col-9">
        <div className='cart'>
          <div className="cart__productsWrapper">
            <table className="cart__table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>محصول</th>
                  <th>قیمت</th>
                  <th>تعداد</th>
                  <th >جمع جزء</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <IoMdClose className="cart__removeIcon"/>
                  </td>
                  <td>
                    <Link to="/" className="cart__productImglink">
                      <img src="/images/phone/phone1.jpg" alt="image products" className="cart__productImg" />
                    </Link>
                  </td>
                  <td>
                    <Link className='cart__productName' to="/">گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128 گیگابایت</Link>
                  </td>
                  <td>
                    <bdi className='currentPrice'>{price.toLocaleString()}
                      <span className='toman'>تومان</span>
                    </bdi>
                  </td>
                  <td>
                  <ProductCount value={count} minValue={1} maxValue={10} newValue={setCount} />
                    <div className="cart__btnsCount">
                      <buttom className="cart__btnCount"></buttom>
                      <buttom className="cart__btnCount"></buttom>
                    </div>
                  </td>
                  <td >
                  <bdi className='currentPrice changeable'>{(price*count).toLocaleString()}
                      <span className='toman'>تومان</span>
                    </bdi>

                  </td>
                </tr>
                <tr>
                  <td>
                    <IoMdClose className="cart__removeIcon"/>
                  </td>
                  <td>
                    <Link to="/" className="cart__productImglink">
                      <img src="/images/phone/phone1.jpg" alt="image products" className="cart__productImg" />
                    </Link>
                  </td>
                  <td>
                    <Link className='cart__productName' to="/">گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128 گیگابایت</Link>
                  </td>
                  <td>
                    <bdi className='currentPrice'>{price.toLocaleString()}
                      <span className='toman'>تومان</span>
                    </bdi>
                  </td>
                  <td>
                  <ProductCount value={count} minValue={1} maxValue={10} newValue={setCount} />
                    <div className="cart__btnsCount">
                      <buttom className="cart__btnCount"></buttom>
                      <buttom className="cart__btnCount"></buttom>
                    </div>
                  </td>
                  <td >
                  <bdi className='currentPrice changeable'>{(price*count).toLocaleString()}
                      <span className='toman'>تومان</span>
                    </bdi>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="discountCode">
          <span className="discountCode__title">کدتخفیف</span>
            <div className="discountCode__getCode">
              <input type="text" name="" id="" className="discountCode__input" placeholder='کد تخفیف'/>
              <button className="discountCode__btnSend">اعمال کدتخفیف</button>
            </div>
        </div>
        </div>
        
    </div>
    <div className="col-3">
        <div className='totalPrice'>
          <h3 className="totolaPrice__title">جمع کل سبد خرید</h3>
          <div className="totolaPrice__postedWrapper">
          {postPrice!==0 ? (
            <>
            <span className="totolaPrice__postText">
            <FaShippingFast className="totolaPrice__icon"/>
           
            هزینه ارسال
            </span>
            <span className="totolaPrice__postPrice">
            <bdi className='productPrice'>{postPrice.toLocaleString()}
                      <span className='toman'>تومان</span>
                    </bdi>
            </span>
            </>
          ):(
          <>
          <span className="totolaPrice__postText">
            <FaShippingFast className="totolaPrice__icon"/>
           
            تبریک، ارسال به صورت رایگان
            </span>
            <span className="totolaPrice__postOffer">
              100
            </span>
          </> 
          )}
           
          </div>
          <div className="totolaPrice__progress"></div>
          <div className="totolaPrice__details">
          <div className="totolaPrice__item">
            <span>جمع جزء</span>
            <bdi className='productPrice'>{price.toLocaleString()}
                      <span className='toman'>تومان</span>
                    </bdi>
          </div>
          <div className="totolaPrice__item">
            <span>مجموع</span>
            <bdi className='productPrice'>{price.toLocaleString()}
                      <span className='toman'>تومان</span>
                    </bdi>
          </div>
          <div className="totolaPrice__item">
            <span>تخفیف شما از این خرید</span>
            <span className="productPriceDiscount">
            <bdi className='productPrice'>{price.toLocaleString()}
                      <span className='toman'>تومان</span>
                    </bdi>
            </span>
            
          </div>
          <Link to="/basket/check-information" className='totolaPrice__Link'>ادامه جهت تسویه حساب
          <FaChevronLeft className='totolaPrice__LinkIcon'/>
          <FaChevronLeft className='totolaPrice__LinkIcon'/>
          </Link>
          </div>
        </div>
    </div>   
    </>

  )
}

export default Cart