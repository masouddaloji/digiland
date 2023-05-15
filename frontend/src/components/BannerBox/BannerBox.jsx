//packages
import { Link } from 'react-router-dom'
//styles
import './BannerBox.css'

function BannerBox(props) {
    const {cover,link}=props
  return (
    <div className="widget__imageBox">
    <Link className="widget__link" to={link}>
      <img
        src={cover}
        alt="banner img"
        className="widget__img"
      />
    </Link>
  </div>
  )
}

export default BannerBox