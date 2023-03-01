import React from 'react'
// styles
import './BestSellingTable.css'

const BestSellingTable = () => {
  return (
    <div className='table__wrapper'>
        <h2 className="table__header">پرفروش ترین محصولات</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>عکس</th>
                    <th>نام</th>
                    <th>دسته بندی</th>
                    <th>قیمت</th>
                    <th>تعداد فروش</th>
                    <th>موجودی</th>
                </tr>
            </thead>
            <tbody>
        <tr>
            <td>1</td>
            <td><img src="/images/sug/sug6.jpg" alt="" className="adminTable__img" /></td>
            <td>گوشی سامسونگ s21</td>
            <td>تلفن همراه</td>
            <td>12,300,000</td>
            <td>121</td>
            <td>19</td>
        </tr>
<<<<<<< HEAD
        <tr>
            <td>2</td>
            <td><img src="/images/sug/sug6.jpg" alt="" className="adminTable__img" /></td>
            <td>گوشی سامسونگ s21</td>
            <td>تلفن همراه</td>
            <td>12,300,000</td>
            <td>121</td>
            <td>19</td>
        </tr>
        <tr>
            <td>3</td>
            <td><img src="/images/sug/sug6.jpg" alt="" className="adminTable__img" /></td>
            <td>گوشی سامسونگ s21</td>
            <td>تلفن همراه</td>
            <td>12,300,000</td>
            <td>121</td>
            <td>19</td>
        </tr>
=======
>>>>>>> 8286f47708ee9e22b8122f0a5b174b8dcf4c78d7
            </tbody>
        </table>
    </div>
  )
}

export default BestSellingTable