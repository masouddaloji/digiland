// import icons
import { BiDollar } from "react-icons/bi";
import { BsCreditCard, BsFillCartCheckFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

<<<<<<< HEAD
=======
// Definition of variables
>>>>>>> 8286f47708ee9e22b8122f0a5b174b8dcf4c78d7
import {BiHome} from 'react-icons/bi'
import {  FaLaptopCode } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import { IoAmericanFootballOutline } from 'react-icons/io5';
import { MdOutlineHomeRepairService } from 'react-icons/md';
import { RiHandHeartLine } from 'react-icons/ri';
import { TbBabyCarriage } from 'react-icons/tb';
<<<<<<< HEAD
import { MdOutlineDevices } from "react-icons/md";



// Definition of variables
export const services=[
  {id:110,title:"موبایل و لپ تاپ",icon:<MdOutlineDevices />,link:"/"},
  {id:120,title:"ماشین های اداری",icon:<MdOutlineDevices />,link:"/"},
  {id:130,title:"صوتی و تصویری",icon:<MdOutlineDevices />,link:"/"},
  {id:140,title:"زیبایی و سلامت",icon:<MdOutlineDevices />,link:"/"},
  {id:150,title:"ورزش و سرگرمی",icon:<MdOutlineDevices />,link:"/"},
  {id:160,title:"ابزارآلات",icon:<MdOutlineDevices />,link:"/"},
]
=======



>>>>>>> 8286f47708ee9e22b8122f0a5b174b8dcf4c78d7
export const menus = [
  {
    id: 1,
    title: "خانه",
    link: "/",
    shortLink: "home",
    icon:<BiHome className="icon" />
  },
  {
    id: 2,
    title: "دیجیتال",
    link: "/products-category/digital",
    shortLink: "digital",
    icon:<FaLaptopCode className="icon"/>,
    subMenu: [
      {
        id: 21,
        title: "تبلت",
        link: "/products-category/digital/tablet",
        shortLink: "tablet",
        img:"/images/submenu/tablet.png"

      },
      {
        id: 22,
        title: "دوربین",
        link: "/products-category/digital/tablet",
        shortLink: "tablet",
        img:"/images/submenu/camera.png"
      },
      {
        id: 23,
        title: "ماشین های اداری",
        link: "/products-category/digital/tablet",
        shortLink: "tablet",
        img:"/images/submenu/workstation.png"
      },
      {
        id: 24,
        title: "لپ تاپ",
        link: "/products-category/digital/tablet",
        shortLink: "tablet",
        img:"/images/submenu/laptop.png"
      },
      {
        id: 25,
        title: "موبایل",
        link: "/products-category/digital/tablet",
        shortLink: "tablet",
        img:"/images/submenu/phone.png"
      },
    ],
  },
  {
    id:3,
    title: "لـوازم خانگی",
    link: "/products-category/household-appliances",
    shortLink: "household-appliances",
    icon:<FiCamera className="icon"/>,
    subMenu: [
      {
        id: 31,
        title: "تلوزیون",
        link: "/products-category/digital/television",
        shortLink: "television",
        img:"/images/submenu/tv.png"
      },
      {
        id: 32,
        title: "کنسول بازی",
        link: "/products-category/digital/game-console",
        shortLink: "game-console",
        img:"/images/submenu/xbox.png"
      },
      {
        id: 33,
        title: "یخچال و فریزر",
        link: "/products-category/digital/refrigerator-freezer",
        shortLink: "refrigerator-freezer",
        img:"/images/submenu/fridge.png"
      },
      {
        id: 34,
        title: "لوازم شستشو و نظافت",
        link: "/products-category/digital/washing-cleaning",
        shortLink: "washing-cleaning",
        img:"/images/submenu/washing-machine.png"
      },
      {
        id: 35,
        title: "لوازم پخت و پز",
        link: "/products-category/digital/cooking",
        shortLink: "cooking",
        img:"/images/submenu/cooking.png"
      },
    ],
  },
  {
    id:4,
    title: "زیبایــی و سلامت",
    link: "/products-category/beauty-health",
    shortLink: "beauty-health",
    icon:<RiHandHeartLine className="icon"/>,
    subMenu: [
        {
            id:41,
            title: "آرایشی",
            link: "/products-category/digital/cosmetic",
            shortLink: "cosmetic",
            img:"/images/submenu/powder.png"
          },
          {
            id: 42,
            title: "زیور آلات",
            link: "/products-category/digital/ornaments",
            shortLink: "ornaments",
            img:"/images/submenu/ring.png"
          },
          {
            id: 43,
            title: "ساعت",
            link: "/products-category/digital/watch",
            shortLink: "watch",
            img:"/images/submenu/watch.png"
          },
          {
            id: 44,
            title: "عطر",
            link: "/products-category/digital/perfume",
            shortLink: "perfume",
            img:"/images/submenu/perfume.png"
          },
          {
            id: 45,
            title: "عینک آفتابی",
            link: "/products-category/digital/sunglasses",
            shortLink: "sunglasses",
            img:"/images/submenu/sun-glasses.png"
          },
    ],
  },
  {
    id:5,
    title: "مادر و کودک",
    link: "/products-category/mother-child",
    shortLink: "mother-child",
    icon:<TbBabyCarriage className="icon"/>,
    subMenu: [
        {
            id:51,
            title: "ایمنی و مراقبت",
            link: "/products-category/digital/safety-care",
            shortLink: "safety-care",
            img:"/images/submenu/mother-room.png"
          },
          {
            id: 52,
            title: "بهداشت و حمام",
            link: "/products-category/digital/health-bathroom",
            shortLink: "health-bathroom",
            img:"/images/submenu/bathtub.png"
          },
          {
            id: 53,
            title: "خواب کودک",
            link: "/products-category/digital/childs-sleep",
            shortLink: "childs-sleep",
            img:"/images/submenu/bed.png"
          },
          {
            id: 54,
            title: "غذا خوری",
            link: "/products-category/digital/eating",
            shortLink: "eating",
            img:"/images/submenu/breakfast.png"
          },
          {
            id: 55,
            title: "لوازم شخصی",
            link: "/products-category/digital/personal-stuff",
            shortLink: "personal-stuff",
            img:"/images/submenu/bib.png"
          },
    ],
  },
  {
    id:6,
    title: "ورزش و سرگرمی",
    link: "/products-category/sport-entertainment",
    shortLink: "sport-entertainment",
    icon:<IoAmericanFootballOutline className="icon"/>,
    subMenu: [
        {
            id:61,
            title: "پوشاک ورزشی",
            link: "/products-category/digital/sportswear",
            shortLink: "sportswear",
            img:"/images/submenu/wear.png"
          },
          {
            id: 62,
            title: "تجهیزات سفر",
            link: "/products-category/digital/travel-equipment",
            shortLink: "travel-equipment",
            img:"/images/submenu/trekking.png"
          },
          {
            id: 63,
            title: "کفش ورزشی",
            link: "/products-category/digital/sport-shoes",
            shortLink: "sport-shoes",
            img:"/images/submenu/trainers.png"
          },
          {
            id: 64,
            title: "لوازم ورزشی",
            link: "/products-category/digital/Sporting-goods",
            shortLink: "Sporting-goods",
            img:"/images/submenu/sports.png"
          },
        
    ],
  },
  {
    id:7,
    title: "ابزار و الکترونیـک",
    link: "/products-category/tools-electronics",
    shortLink: "tools-electronics",
    icon:<MdOutlineHomeRepairService className="icon"/>,
    subMenu: [
        {
            id:71,
            title: "ابزار برقی و شارژی",
            link: "/products-category/digital/electric-rechargeable-tools",
            shortLink: "electric-rechargeable-tools",
            img:"/images/submenu/grinding-machine.png"
          },
          {
            id: 72,
            title: "تجهیزات سفر",
            link: "/products-category/digital/non-electrical-tools",
            shortLink: "non-electrical-tools",
            img:"/images/submenu/tools.png"
          },
         
        
    ],
  },
];
export const adminPanelItems=[
    {id:111,title:"سفارشات جدید",amount:3025,percent:2.00 ,color:"purple",positive:true,icon:<BsFillCartCheckFill className="f-24" />},
    {id:112,title:"فروش ماهانه",amount:75000000,percent:5.45 ,color:"green",positive:true,icon:<BiDollar className="f-24" />},
    {id:113,title:"سود ماهانه",amount:15000000,percent:2 ,color:"prim",positive:false,icon:<BsCreditCard className="f-24" />},
    {id:114,title:"کاربران جدید",amount:634,percent:1.8 ,color:"orange",positive:false,icon:<FaRegUser className="f-24" />},
]
export const monthlyInformationChart=[
    {month:"فروردین" , sales:7450,profit:500, newUsers:138},
    {month:"اردیبهشت" , sales:6450,profit:400, newUsers:98},
    {month:"خرداد" , sales:8250,profit:600, newUsers:138},
    {month:"تیر" , sales:6320,profit:500, newUsers:138},
    {month:"مرداد" , sales:7800,profit:290, newUsers:138},
    {month:"شهریور" , sales:5950,profit:300, newUsers:138},
    {month:"مهر" , sales:10000,profit:1500, newUsers:138},
    {month:"آبان" , sales:9400,profit:1200, newUsers:138},
    {month:"آذر" , sales:8600,profit:850, newUsers:138},
    {month:"دی" , sales:6400,profit:540, newUsers:138},
    {month:"بهمن" , sales:5000,profit:500, newUsers:138},
    {month:"اسفند" , sales:9700,profit:1400, newUsers:138}
]
export const weeklyInformationChart=[

]
