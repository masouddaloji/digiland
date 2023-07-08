import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";


const ScrollToTop = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    const appWrapper = document.querySelector('.app__wrapper') 
    appWrapper.scrollTo(0, 0)
  }, [location.pathname]);
  return children
} 
export default ScrollToTop;
