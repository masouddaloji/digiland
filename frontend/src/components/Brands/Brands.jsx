//styles
import './Brands.css'

export default function Brands() {
  return (
    <div className='brands'>

        <div className="brands__brandBox">
            <img className='brands__brandImg' src="/images/brands/apple.png" alt="" />
            <span className='brands__brandTitle'>اپل</span>
        </div>

        <div className="brands__brandBox">
            <img className='brands__brandImg' src="/images/brands/lg.png" alt="" />
            <span className='brands__brandTitle'>ال جی</span>
        </div>
        <div className="brands__brandBox">
            <img className='brands__brandImg' src="/images/brands/samsung.png" alt="" />
            <span className='brands__brandTitle'>سامسونگ</span>
        </div>
        <div className="brands__brandBox">
            <img className='brands__brandImg' src="/images/brands/asus.png" alt="" />
            <span className='brands__brandTitle'>ایسوس</span>
        </div>
    </div>
  )
}
