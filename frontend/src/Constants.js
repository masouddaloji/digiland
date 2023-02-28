// import icons
import { BiDollar } from "react-icons/bi";
import { BsCreditCard, BsFillCartCheckFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

// Definition of variables

export const adminPanelItems=[
    {id:111,title:"سفارشات جدید",amount:3025,percent:2.00 ,color:"purple",positive:true,icon:<BsFillCartCheckFill className="f-24" />},
    {id:112,title:"فروش ماهانه",amount:75000000,percent:5.45 ,color:"green",positive:true,icon:<BiDollar className="f-24" />},
    {id:113,title:"سود ماهانه",amount:15000000,percent:2 ,color:"prim",positive:false,icon:<BsCreditCard className="f-24" />},
    {id:114,title:"کاربران جدید",amount:634,percent:1.8 ,color:"orange",positive:false,icon:<FaRegUser className="f-24" />},
]