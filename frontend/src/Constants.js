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
export const monthlyInformationChart=[
    {month:"فروردین" , sales:7450000,profit:500000, newUsers:138},
    {month:"اردیبهشت" , sales:6450000,profit:400000, newUsers:98},
    {month:"خرداد" , sales:8250000,profit:600000, newUsers:138},
    {month:"تیر" , sales:6320000,profit:500000, newUsers:138},
    {month:"مرداد" , sales:7800000,profit:290000, newUsers:138},
    {month:"شهریور" , sales:5950000,profit:300000, newUsers:138},
    {month:"مهر" , sales:10000000,profit:1500000, newUsers:138},
    {month:"آبان" , sales:9400000,profit:1200000, newUsers:138},
    {month:"آذر" , sales:8600000,profit:850000, newUsers:138},
    {month:"دی" , sales:6400000,profit:540000, newUsers:138},
    {month:"بهمن" , sales:5000000,profit:500000, newUsers:138},
    {month:"اسفند" , sales:9700000,profit:1400000, newUsers:138}
]
export const weeklyInformationChart=[

]