import React from 'react'
import { BsClockHistory } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './ArticleBox.css'

export default function ArticleBox() {
  return (
    <div className='articleBox'>
        <Link className="articleBox__link" to="/">
            <div className="articleBox__banner">
                <img src="/images/article1.webp" alt="article banner" className="articleBox__img" />
            </div>
            <div className="articleBox__title">تاثیر هوش مصنوعی بر بازاریابی دیجیتال</div>
        </Link>
            <div className="articleBox__details">
                <div className="articleBox__author">
                    <img className='articleBox__authorImg' src="/images/author.jpg" alt="author article img" />
                    <span className='articleBox__authorName'>امین بیگ زاده</span>
                </div>
                <div className="articleBox__time">
                <div className="articleBox__iconBox">
                    <BsClockHistory className='fullIcon'/>
                </div>
                <span className='articleBox__upload'>23<bdi>دی</bdi>1401</span>
                </div>
            </div>
    </div>
  )
}
