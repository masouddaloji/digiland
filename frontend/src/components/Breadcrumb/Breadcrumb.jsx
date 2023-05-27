//packages
import { Link} from "react-router-dom";
//styles
import "./Breadcrumb.css";

function Breadcrumb() {
  // const productsContext = useContext(ProductsContext);
  // const [crumbs, setCrumbs] = useState([{title:"خانه",link:"/"}]);
  // const { categoryName, subCategory, productId } = useParams();
  // useEffect(() => {
  //   !productsContext.isLoadingCategories &&  !productsContext.isLoadingProducts && createCrumbs();
  // }, [categoryName, subCategory, productId]);

  // const createCrumbs = () => {
  //   if (categoryName) {
  //     let currentCategory = {};
  //     let currentsub = {};
  //     let currentsubSub = {};
  //     currentCategory = productsContext.categories.find(
  //       (category) => category.attributes.shortLink === categoryName
  //     );
  //     setCrumbs(prevCrumbs=>([{title:"خانه",link:"/"},{title:currentCategory.attributes.title,link:currentCategory.attributes.link}]));
  //     if (subCategory) {
  //       currentsub = currentCategory.attributes.sub_categories.data.find(
  //         (sub) => sub.attributes.shortLink === subCategory
  //       );
  //       setCrumbs((prevCrumbs) => [...prevCrumbs,{ title:currentsub.attributes.title,link:currentsub.attributes.link}]);
  //     }
  //   } else if(productId){
  //     let currentProduct = {};
  //     currentProduct=productsContext.products.find(product=>product.attributes.productId===productId)
  //     setCrumbs([{title:"خانه",link:"/"},
  //     {title:currentProduct.attributes.category.data.attributes.title,link:currentProduct.attributes.category.data.attributes.link},
  //     {title:currentProduct.attributes.sub_category.data.attributes.title,link:currentProduct.attributes.sub_category.data.attributes.link},
  //     {title:currentProduct.attributes.title,link:currentProduct.attributes.link}
  //   ])
  //   }
  // };

  return (
    <div className="breadcrumb">
      <div className="breadcrumb__wrapper">
        <ul className="breadcrumb__lists">
          {crumbs.map((item,index)=>(

            <li className="breadcrumb__item">
            {index !== crumbs.length-1 ?<Link className="breadcrumb__link" to={item.link}>
              {item.title}
            </Link>
            :
            <span className="breadcrumb__link"> {item.title}</span>
            }

            {index !== crumbs.length-1 ? <span className="breadcrumb__divider">/</span> : null}
          </li>
          ))}

          </ul>
      </div>
    </div>
  );
}

export default Breadcrumb;
