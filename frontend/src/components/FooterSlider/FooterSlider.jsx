//styles
import "./FooterSlider.css";

const FooterSlider = (props) => {
  const { title, img } = props;
  return (
        <div className="footerSlide">
          <img src={img} alt="footer img" className="footerSlide__img" />
          <span className="footerSlide__caption">{title}</span>
        </div>

  );
};

export default FooterSlider;
