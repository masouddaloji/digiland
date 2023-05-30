//packages
import { nanoid } from "@reduxjs/toolkit";

// import icons
import { BiDollar } from "react-icons/bi";
import {
  BsBoxSeam,
  BsCreditCard,
  BsFillCartCheckFill,
  BsPrinter,
  BsTools,
} from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { IoAmericanFootballOutline, IoGridOutline } from "react-icons/io5";
import {
  MdOutlineAddShoppingCart,
  MdOutlineHomeRepairService,
} from "react-icons/md";
import {
  RiArticleLine,
  RiHandHeartLine,
  RiHeartPulseLine,
} from "react-icons/ri";
import { TbBabyCarriage, TbDeviceTvOld } from "react-icons/tb";
import { MdOutlineDevices } from "react-icons/md";
import { IoMdFootball } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import { SiApple, SiAsus, SiLenovo, SiSamsung, SiXiaomi } from 'react-icons/si'

// Definition of variables
export const services = [
  {
    id: 110,
    title: "موبایل و لپ تاپ",
    icon: <MdOutlineDevices className="f-24" />,
    link: "/",
  },
  {
    id: 120,
    title: "ماشین های اداری",
    icon: <BsPrinter className="f-24" />,
    link: "/",
  },
  {
    id: 130,
    title: "صوتی و تصویری",
    icon: <TbDeviceTvOld className="f-24" />,
    link: "/",
  },
  {
    id: 140,
    title: "زیبایی و سلامت",
    icon: <RiHeartPulseLine className="f-24" />,
    link: "/",
  },
  {
    id: 150,
    title: "ورزش و سرگرمی",
    icon: <IoMdFootball className="f-24" />,
    link: "/",
  },
  {
    id: 160,
    title: "ابزارآلات",
    icon: <BsTools className="f-24" />,
    link: "/",
  },
];
export const menus = [
  {
    id: 2,
    title: "دیجیتال",
    link: "/products/digital",
    shortLink: "digital",
    icon: <FaLaptopCode className="icon" />,
    subMenu: [
      {
        id: 21,
        title: "تبلت",
        link: "/products/digital/tablet",
        shortLink: "tablet",
        img: "/images/submenu/tablet.png",
      },
      {
        id: 22,
        title: "دوربین",
        link: "/products/digital/camera",
        shortLink: "camera",
        img: "/images/submenu/camera.png",
      },
      {
        id: 23,
        title: "ماشین های اداری",
        link: "/products/digital/workstation",
        shortLink: "workstation",
        img: "/images/submenu/workstation.png",
      },
      {
        id: 24,
        title: "لپ تاپ",
        link: "/products/digital/laptop",
        shortLink: "laptop",
        img: "/images/submenu/laptop.png",
      },
      {
        id: 25,
        title: "موبایل",
        link: "/products/digital/phone",
        shortLink: "phone",
        img: "/images/submenu/phone.png",
      },
    ],
  },
  {
    id: 3,
    title: "لـوازم خانگی",
    link: "/products/household-appliances",
    shortLink: "household-appliances",
    icon: <FiCamera className="icon" />,
    subMenu: [
      {
        id: 31,
        title: "تلوزیون",
        link: "/products/household-appliances/television",
        shortLink: "television",
        img: "/images/submenu/tv.png",
      },
      {
        id: 32,
        title: "کنسول بازی",
        link: "/products/household-appliances/game-console",
        shortLink: "game-console",
        img: "/images/submenu/xbox.png",
      },
      {
        id: 33,
        title: "یخچال و فریزر",
        link: "/products/household-appliances/refrigerator-freezer",
        shortLink: "refrigerator-freezer",
        img: "/images/submenu/fridge.png",
      },
      {
        id: 34,
        title: "لوازم شستشو و نظافت",
        link: "/products/household-appliances/washing-cleaning",
        shortLink: "washing-cleaning",
        img: "/images/submenu/washing-machine.png",
      },
      {
        id: 35,
        title: "لوازم پخت و پز",
        link: "/products/household-appliances/cooking",
        shortLink: "cooking",
        img: "/images/submenu/cooking.png",
      },
    ],
  },
  {
    id: 4,
    title: "زیبایــی و سلامت",
    link: "/products/beauty-health",
    shortLink: "beauty-health",
    icon: <RiHandHeartLine className="icon" />,
    subMenu: [
      {
        id: 41,
        title: "آرایشی",
        link: "/products/beauty-health/cosmetic",
        shortLink: "cosmetic",
        img: "/images/submenu/powder.png",
      },
      {
        id: 42,
        title: "زیور آلات",
        link: "/products/beauty-health/ornaments",
        shortLink: "ornaments",
        img: "/images/submenu/ring.png",
      },
      {
        id: 43,
        title: "ساعت",
        link: "/products/beauty-health/watch",
        shortLink: "watch",
        img: "/images/submenu/watch.png",
      },
      {
        id: 44,
        title: "عطر",
        link: "/products/beauty-health/perfume",
        shortLink: "perfume",
        img: "/images/submenu/perfume.png",
      },
      {
        id: 45,
        title: "عینک آفتابی",
        link: "/products/beauty-health/sunglasses",
        shortLink: "sunglasses",
        img: "/images/submenu/sun-glasses.png",
      },
    ],
  },
  {
    id: 5,
    title: "مادر و کودک",
    link: "/products/mother-child",
    shortLink: "mother-child",
    icon: <TbBabyCarriage className="icon" />,
    subMenu: [
      {
        id: 51,
        title: "ایمنی و مراقبت",
        link: "/products/mother-child/safety-care",
        shortLink: "safety-care",
        img: "/images/submenu/mother-room.png",
      },
      {
        id: 52,
        title: "بهداشت و حمام",
        link: "/products/mother-child/health-bathroom",
        shortLink: "health-bathroom",
        img: "/images/submenu/bathtub.png",
      },
      {
        id: 53,
        title: "خواب کودک",
        link: "/products/mother-child/childs-sleep",
        shortLink: "childs-sleep",
        img: "/images/submenu/bed.png",
      },
      {
        id: 54,
        title: "غذا خوری",
        link: "/products/mother-child/eating",
        shortLink: "eating",
        img: "/images/submenu/breakfast.png",
      },
      {
        id: 55,
        title: "لوازم شخصی",
        link: "/products/mother-child/personal-stuff",
        shortLink: "personal-stuff",
        img: "/images/submenu/bib.png",
      },
    ],
  },
  {
    id: 6,
    title: "ورزش و سرگرمی",
    link: "/products/sport-entertainment",
    shortLink: "sport-entertainment",
    icon: <IoAmericanFootballOutline className="icon" />,
    subMenu: [
      {
        id: 61,
        title: "پوشاک ورزشی",
        link: "/products/sport-entertainment/sportswear",
        shortLink: "sportswear",
        img: "/images/submenu/wear.png",
      },
      {
        id: 62,
        title: "تجهیزات سفر",
        link: "/products/sport-entertainment/travel-equipment",
        shortLink: "travel-equipment",
        img: "/images/submenu/trekking.png",
      },
      {
        id: 63,
        title: "کفش ورزشی",
        link: "/products/sport-entertainment/sport-shoes",
        shortLink: "sport-shoes",
        img: "/images/submenu/trainers.png",
      },
      {
        id: 64,
        title: "لوازم ورزشی",
        link: "/products/sport-entertainment/Sporting-goods",
        shortLink: "Sporting-goods",
        img: "/images/submenu/sports.png",
      },
    ],
  },
  {
    id: 7,
    title: "ابزار و الکترونیـک",
    link: "/products/tools-electronics",
    shortLink: "tools-electronics",
    icon: <MdOutlineHomeRepairService className="icon" />,
    subMenu: [
      {
        id: 71,
        title: "ابزار برقی و شارژی",
        link: "/products/tools-electronics/electric-rechargeable-tools",
        shortLink: "electric-rechargeable-tools",
        img: "/images/submenu/grinding-machine.png",
      },
      {
        id: 72,
        title: "تجهیزات سفر",
        link: "/products/tools-electronics/non-electrical-tools",
        shortLink: "non-electrical-tools",
        img: "/images/submenu/tools.png",
      },
    ],
  },
];
export const banners = [
  { id: 101, link: "/", cover: "/images/widget/widget-img-1.png" },
  { id: 202, link: "/", cover: "/images/widget/widget-img-2.png" },
  { id: 303, link: "/", cover: "/images/widget/widget-img-3.png" },
  { id: 404, link: "/", cover: "/images/widget/widget-img-4.png" },
];
export const smallBanners = [
  {
    id: nanoid(),
    image: "/images/banner-2.webp",
    link: "/",
  },
  {
    id: nanoid(),
    image: "/images/banner-3.webp",
    link: "/",
  },
  {
    id: nanoid(),
    image: "/images/banner-1.webp",
    link: "/",
  },
];
export const adminPanelItems = [
  {
    id: 111,
    title: "سفارشات جدید",
    amount: 3025,
    percent: 2.0,
    color: "purple",
    positive: true,
    icon: <BsFillCartCheckFill className="f-24" />,
  },
  {
    id: 112,
    title: "فروش ماهانه",
    amount: 75000000,
    percent: 5.45,
    color: "green",
    positive: true,
    icon: <BiDollar className="f-24" />,
  },
  {
    id: 113,
    title: "سود ماهانه",
    amount: 15000000,
    percent: 2,
    color: "prim",
    positive: false,
    icon: <BsCreditCard className="f-24" />,
  },
  {
    id: 114,
    title: "کاربران جدید",
    amount: 634,
    percent: 1.8,
    color: "orange",
    positive: false,
    icon: <FaRegUser className="f-24" />,
  },
];
export const monthlyInformationChart = [
  { month: "فروردین", sales: 7450, profit: 500, newUsers: 138 },
  { month: "اردیبهشت", sales: 6450, profit: 400, newUsers: 98 },
  { month: "خرداد", sales: 8250, profit: 600, newUsers: 138 },
  { month: "تیر", sales: 6320, profit: 500, newUsers: 138 },
  { month: "مرداد", sales: 7800, profit: 290, newUsers: 138 },
  { month: "شهریور", sales: 5950, profit: 300, newUsers: 138 },
  { month: "مهر", sales: 10000, profit: 1500, newUsers: 138 },
  { month: "آبان", sales: 9400, profit: 1200, newUsers: 138 },
  { month: "آذر", sales: 8600, profit: 850, newUsers: 138 },
  { month: "دی", sales: 6400, profit: 540, newUsers: 138 },
  { month: "بهمن", sales: 5000, profit: 500, newUsers: 138 },
  { month: "اسفند", sales: 9700, profit: 1400, newUsers: 138 },
];
export const weeklyInformationChart = [];
export const adminSidebarItems = [
  {
    icon: <IoGridOutline className="sidebarItem__mainIcon" />,
    title: "داشبورد",
    link: "/adminpanel/dashboard",
  },
  {
    icon: <BsBoxSeam className="sidebarItem__mainIcon" />,
    title: "محصولات",
    link: "products",
  },
  {
    icon: <HiOutlineUserGroup className="sidebarItem__mainIcon" />,
    title: "کاربران",
    link: "users",
  },
  {
    icon: <MdOutlineAddShoppingCart className="sidebarItem__mainIcon" />,
    title: "سفارشات",
    link: "orders",
  },
  {
    icon: <RiArticleLine className="sidebarItem__mainIcon" />,
    title: "مقالات",
    link: "articles",
  },
];
export const ratingOptions = [
  { value: 1, text: "بد" },
  { value: 2, text: "معمولی" },
  { value: 3, text: "خوب" },
  { value: 4, text: "خیلی خوب" },
  { value: 5, text: "عالی" },
];
export const colorOptions = [
  { value: "قرمز", color: "#FF0000" },
  { value: "مشکی", color: "#000" },
  { value: "طلائی", color: "#ffd300" },
  { value: "آبی", color: "#0000FF" },
  { value: "سبز", color: "#00FF00" },
  { value: "سفید", color: "#FFF" },
  { value: "صورتی", color: "#FF69B4" },
];
export const allInfosBtn = [
  { id: "info-btn-1", titleFa: "توضیحات", titleEn: "description" },
  { id: "info-btn-2", titleFa: "مشخصات", titleEn: "specifications" },
  { id: "info-btn-3", titleFa: "نظرات کاربران", titleEn: "userComments" },
  { id: "info-btn-4", titleFa: " نقد و بررسی", titleEn: "review" },
];
export const footerSliderItems = [
  {
    id: "footer-slider-1",
    title: "بسته بندی زیبا",
    img: "/images/footer/gift.webp",
  },
  {
    id: "footer-slider-2",
    title: "ارسال به تمام نقاط",
    img: "/images/footer/map.webp",
  },
  {
    id: "footer-slider-3",
    title: "ضمانت اصل بودن",
    img: "/images/footer/secure.webp",
  },
  {
    id: "footer-slider-4",
    title: "تضمین بهترین قیمت",
    img: "/images/footer/credit-card.webp",
  },
  {
    id: "footer-slider-5",
    title: "پرداخت در محل",
    img: "/images/footer/wallet.webp",
  },
  {
    id: "footer-slider-6",
    title: "ضمانت بازگشت",
    img: "/images/footer/money.webp",
  },
  {
    id: "footer-slider-7",
    title: "تحویل اکسپرس",
    img: "/images/footer/packaging-6.webp",
  },
];
export const sortedProductsItems = [
  {
    id: "sorte_products_items_1",
    title: "مرتب‌ سازی براساس امتیاز",
    sortedBy: "rating",
  },
  {
    id: "sorte_products_items_2",
    title: "مرتب‌ سازی براساس جدیدترین",
    sortedBy: "latest",
  },
  {
    id: "sorte_products_items_3",
    title: "مرتب‌ سازی براساس ارزان ترین",
    sortedBy: "price-low-to-high",
  },
  {
    id: "sorte_products_items_4",
    title: "مرتب‌ سازی براساس گران ترین",
    sortedBy: "price-high-to-low",
  },
];
export const brands = [
  {
    id: nanoid(),
    title: "apple",
    text: "اپل",
    icon: <SiApple className="brand__icon"/>,
  },
  {
    id: nanoid(),
    title: "lenovo",
    text: "لنوو",
    icon: <SiLenovo className="brand__icon"/>,
  },
  {
    id: nanoid(),
    title: "samsung",
    text: "سامسونگ",
    icon: <SiSamsung className="brand__icon"/>,
  },
  {
    id: nanoid(),
    title: "xiaomi",
    text: "شیائومی",
    icon: <SiXiaomi className="brand__icon"/>,
  },
  {
    id: nanoid(),
    title: "asus",
    text: "ایسوس",
    icon: <SiAsus className="brand__icon"/>,
  },
];
