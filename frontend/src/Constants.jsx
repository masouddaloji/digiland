//packages
import { nanoid } from "@reduxjs/toolkit";

// import icons
import {
  BiHome,
  BiStoreAlt,
  BiTachometer,
} from "react-icons/bi";
import {
  BsBoxSeam,
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
  RiShoppingBasket2Line,
} from "react-icons/ri";
import { TbBabyCarriage, TbDeviceTvOld } from "react-icons/tb";
import { MdOutlineDevices } from "react-icons/md";
import { IoMdFootball } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CgShoppingBag } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";

// Definition of variables
export const services = [
  {
    id: nanoid(),
    title: "موبایل و لپ تاپ",
    icon: <MdOutlineDevices className="f-24" />,
    link: "/",
  },
  {
    id: nanoid(),
    title: "ماشین های اداری",
    icon: <BsPrinter className="f-24" />,
    link: "/",
  },
  {
    id: nanoid(),
    title: "صوتی و تصویری",
    icon: <TbDeviceTvOld className="f-24" />,
    link: "/",
  },
  {
    id: nanoid(),
    title: "زیبایی و سلامت",
    icon: <RiHeartPulseLine className="f-24" />,
    link: "/",
  },
  {
    id: nanoid(),
    title: "ورزش و سرگرمی",
    icon: <IoMdFootball className="f-24" />,
    link: "/",
  },
  {
    id: nanoid(),
    title: "ابزارآلات",
    icon: <BsTools className="f-24" />,
    link: "/",
  },
];
export const menus = [
  {
    id: nanoid(),
    title: "دیجیتال",
    link: "/products/digital",
    shortLink: "digital",
    img: "/images/category/multiple-devices.png",
    icon: <FaLaptopCode className="icon" />,
    subMenu: [
      {
        id: nanoid(),
        title: "تبلت",
        link: "/products/digital/tablet",
        shortLink: "tablet",
        img: "/images/submenu/tablet.png",
      },
      {
        id: nanoid(),
        title: "دوربین",
        link: "/products/digital/camera",
        shortLink: "camera",
        img: "/images/submenu/camera.png",
      },
      {
        id: nanoid(),
        title: "ماشین های اداری",
        link: "/products/digital/workstation",
        shortLink: "workstation",
        img: "/images/submenu/workstation.png",
      },
      {
        id: nanoid(),
        title: "لپ تاپ",
        link: "/products/digital/laptop",
        shortLink: "laptop",
        img: "/images/submenu/laptop.png",
      },
      {
        id: nanoid(),
        title: "موبایل",
        link: "/products/digital/phone",
        shortLink: "phone",
        img: "/images/submenu/phone.png",
      },
    ],
  },
  {
    id: nanoid(),
    title: "لـوازم خانگی",
    link: "/products/household-appliances",
    shortLink: "household-appliances",
    img: "/images/category/appliances.png",
    icon: <FiCamera className="icon" />,
    subMenu: [
      {
        id: nanoid(),
        title: "تلوزیون",
        link: "/products/household-appliances/television",
        shortLink: "television",
        img: "/images/submenu/tv.png",
      },
      {
        id: nanoid(),
        title: "کنسول بازی",
        link: "/products/household-appliances/game-console",
        shortLink: "game-console",
        img: "/images/submenu/xbox.png",
      },
      {
        id: nanoid(),
        title: "یخچال و فریزر",
        link: "/products/household-appliances/refrigerator-freezer",
        shortLink: "refrigerator-freezer",
        img: "/images/submenu/fridge.png",
      },
      {
        id: nanoid(),
        title: "شستشو و نظافت",
        link: "/products/household-appliances/washing-cleaning",
        shortLink: "washing-cleaning",
        img: "/images/submenu/washing-machine.png",
      },
      {
        id: nanoid(),
        title: "لوازم پخت و پز",
        link: "/products/household-appliances/cooking",
        shortLink: "cooking",
        img: "/images/submenu/cooking.png",
      },
    ],
  },
  {
    id: nanoid(),
    title: "زیبایــی و سلامت",
    link: "/products/beauty-health",
    shortLink: "beauty-health",
    img: "/images/category/beauty-health.png",
    icon: <RiHandHeartLine className="icon" />,
    subMenu: [
      {
        id: nanoid(),
        title: "آرایشی",
        link: "/products/beauty-health/cosmetic",
        shortLink: "cosmetic",
        img: "/images/submenu/powder.png",
      },
      {
        id: nanoid(),
        title: "زیور آلات",
        link: "/products/beauty-health/ornaments",
        shortLink: "ornaments",
        img: "/images/submenu/ring.png",
      },
      {
        id: nanoid(),
        title: "ساعت",
        link: "/products/beauty-health/watch",
        shortLink: "watch",
        img: "/images/submenu/watch.png",
      },
      {
        id: nanoid(),
        title: "عطر",
        link: "/products/beauty-health/perfume",
        shortLink: "perfume",
        img: "/images/submenu/perfume.png",
      },
      {
        id: nanoid(),
        title: "عینک آفتابی",
        link: "/products/beauty-health/sunglasses",
        shortLink: "sunglasses",
        img: "/images/submenu/sun-glasses.png",
      },
    ],
  },
  {
    id: nanoid(),
    title: "مادر و کودک",
    link: "/products/mother-child",
    shortLink: "mother-child",
    img: "/images/category/mother.png",
    icon: <TbBabyCarriage className="icon" />,
    subMenu: [
      {
        id: nanoid(),
        title: "ایمنی و مراقبت",
        link: "/products/mother-child/safety-care",
        shortLink: "safety-care",
        img: "/images/submenu/mother-room.png",
      },
      {
        id: nanoid(),
        title: "بهداشت و حمام",
        link: "/products/mother-child/health-bathroom",
        shortLink: "health-bathroom",
        img: "/images/submenu/bathtub.png",
      },
      {
        id: nanoid(),
        title: "خواب کودک",
        link: "/products/mother-child/childs-sleep",
        shortLink: "childs-sleep",
        img: "/images/submenu/bed.png",
      },
      {
        id: nanoid(),
        title: "غذا خوری",
        link: "/products/mother-child/eating",
        shortLink: "eating",
        img: "/images/submenu/breakfast.png",
      },
      {
        id: nanoid(),
        title: "لوازم شخصی",
        link: "/products/mother-child/personal-stuff",
        shortLink: "personal-stuff",
        img: "/images/submenu/bib.png",
      },
    ],
  },
  {
    id: nanoid(),
    title: "ورزش و سرگرمی",
    link: "/products/sport-entertainment",
    shortLink: "sport-entertainment",
    img: "/images/category/sport.png",
    icon: <IoAmericanFootballOutline className="icon" />,
    subMenu: [
      {
        id: nanoid(),
        title: "پوشاک ورزشی",
        link: "/products/sport-entertainment/sportswear",
        shortLink: "sportswear",
        img: "/images/submenu/wear.png",
      },
      {
        id: nanoid(),
        title: "تجهیزات سفر",
        link: "/products/sport-entertainment/travel-equipment",
        shortLink: "travel-equipment",
        img: "/images/submenu/trekking.png",
      },
      {
        id: nanoid(),
        title: "کفش ورزشی",
        link: "/products/sport-entertainment/sport-shoes",
        shortLink: "sport-shoes",
        img: "/images/submenu/trainers.png",
      },
      {
        id: nanoid(),
        title: "لوازم ورزشی",
        link: "/products/sport-entertainment/Sporting-goods",
        shortLink: "Sporting-goods",
        img: "/images/submenu/sports.png",
      },
    ],
  },
  {
    id: nanoid(),
    title: "ابزار و الکترونیـک",
    link: "/products/tools-electronics",
    shortLink: "tools-electronics",
    img: "/images/category/electricTools.png",
    icon: <MdOutlineHomeRepairService className="icon" />,
    subMenu: [
      {
        id: nanoid(),
        title: "ابزار برقی و شارژی",
        link: "/products/tools-electronics/electric-rechargeable-tools",
        shortLink: "electric-rechargeable-tools",
        img: "/images/submenu/drill.png",
      },
      {
        id: nanoid(),
        title: "ابزار غیربرقی",
        link: "/products/tools-electronics/non-electrical-tools",
        shortLink: "non-electrical-tools",
        img: "/images/submenu/tools.png",
      },
    ],
  },
];

export const banners = [
  { id: nanoid(), link: "/", cover: "/images/widget/widget-img-1.png" },
  { id: nanoid(), link: "/", cover: "/images/widget/widget-img-2.png" },
  { id: nanoid(), link: "/", cover: "/images/widget/widget-img-3.png" },
  { id: nanoid(), link: "/", cover: "/images/widget/widget-img-4.png" },
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
    id: nanoid(),
    title: "سفارشات جدید",
    amount: 3025,
    percent: 2.0,
    positive: true,
    isPrice:false
  },
  {
    id: nanoid(),
    title: "فروش ماهانه",
    amount: 75000000,
    percent: 10,
    positive: true,
    isPrice:true
  },
  {
    id: nanoid(),
    title: "سود ماهانه",
    amount: 15000000,
    percent: 8,
    positive: false,
    isPrice:true
  },
  {
    id: nanoid(),
    title: "کاربران جدید",
    amount: 634,
    percent: 1.8,
    positive: false,
    isPrice:false
  },
];
export const monthlyInformationChart = [
  { month: "فروردین", فروش: 990, سود: 330 },
  { month: "اردیبهشت", فروش: 976, سود: 325 },
  { month: "خرداد", فروش: 894, سود: 298 },
  { month: "تیر", فروش: 767, سود: 255 },
  { month: "مرداد", فروش: 625, سود: 208 },
  { month: "شهریور", فروش: 778, سود:259 },
  { month: "مهر", فروش: 992, سود: 330 },
  { month: "آبان", فروش: 812, سود: 270 },
  { month: "آذر", فروش: 889, سود: 296 },
  { month: "دی", فروش: 745, سود: 248 },
  { month: "بهمن", فروش: 919, سود: 306 },
  { month: "اسفند", فروش: 850, سود: 283 },
];
export const weeklyInformationChart = [];
export const adminSidebarItems = [
  {
    id: nanoid(),
    icon: <IoGridOutline className="sidebarItem__mainIcon" />,
    title: "داشبورد",
    link: "/adminpanel",
  },
  {
    id: nanoid(),
    icon: <BsBoxSeam className="sidebarItem__mainIcon" />,
    title: "محصولات",
    link: "/adminproducts",
  },
  {
    id: nanoid(),
    icon: <HiOutlineUserGroup className="sidebarItem__mainIcon" />,
    title: "کاربران",
    link: "/admin-users",
  },
  {
    id: nanoid(),
    icon: <MdOutlineAddShoppingCart className="sidebarItem__mainIcon" />,
    title: "سفارشات",
    link: "/admin-orders",
  },
  {
    id: nanoid(),
    icon: <RiArticleLine className="sidebarItem__mainIcon" />,
    title: "مقالات",
    link: "/admin-articles",
  },
];
export const userPanelSidebarItems = [
  {
    id: nanoid(),
    title: "پیشخوان",
    link: "/userpanel",
    icon: <BiTachometer className="user-sidebar__icon" />,
  },
  {
    id: nanoid(),
    title: "سبد خرید",
    link: "/basket",
    icon: <CgShoppingBag className="user-sidebar__icon" />,
  },
  {
    id: nanoid(),
    title: "سفارش ها",
    link: "/userorders",
    icon: <RiShoppingBasket2Line className="user-sidebar__icon" />,
  },
  {
    id: nanoid(),
    title: "علاقه مندی ها",
    link: "/userfavorite",
    icon: <AiOutlineHeart className="user-sidebar__icon" />,
  },
  {
    id: nanoid(),
    title: "آدرس",
    link: "/useraddress",
    icon: <BiHome className="user-sidebar__icon" />,
  },
  {
    id: nanoid(),
    title: "فروشگاه",
    link: "/products",
    icon: <BiStoreAlt className="user-sidebar__icon" />,
  },
  {
    id: nanoid(),
    title: "جزئیات حساب",
    link: "/usersetting",
    icon: <FaRegUser className="user-sidebar__icon" />,
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
  {id:nanoid(),value: "قرمز", img: "/images/optionColor/red.png" },
  {id:nanoid(),value: "مشکی", img: "/images/optionColor/black.png" },
  {id:nanoid(),value: "طلائی", img: "/images/optionColor/yellow.png" },
  {id:nanoid(),value: "آبی", img: "/images/optionColor/blue.png" },
  {id:nanoid(),value: "سبز", img: "/images/optionColor/green.png" },
  {id:nanoid(),value: "سفید", img: "/images/optionColor/white.png" },
  {id:nanoid(),value: "صورتی", img: "/images/optionColor/pink.png" },
];
export const allInfosBtn = [
  { id: nanoid(), titleFa: "توضیحات", titleEn: "description" },
  { id: nanoid(), titleFa: "مشخصات", titleEn: "specifications" },
  { id: nanoid(), titleFa: "نظرات کاربران", titleEn: "userComments" },
  { id: nanoid(), titleFa: " نقد و بررسی", titleEn: "review" },
];
export const footerSliderItems = [
  {
    id: nanoid(),
    title: "بسته بندی زیبا",
    img: "/images/footer/gift.webp",
  },
  {
    id: nanoid(),
    title: "ارسال به تمام نقاط",
    img: "/images/footer/map.webp",
  },
  {
    id: nanoid(),
    title: "ضمانت اصل بودن",
    img: "/images/footer/secure.webp",
  },
  {
    id: nanoid(),
    title: "تضمین بهترین قیمت",
    img: "/images/footer/credit-card.webp",
  },
  {
    id: nanoid(),
    title: "پرداخت در محل",
    img: "/images/footer/wallet.webp",
  },
  {
    id: nanoid(),
    title: "ضمانت بازگشت",
    img: "/images/footer/money.webp",
  },
  {
    id: nanoid(),
    title: "تحویل اکسپرس",
    img: "/images/footer/packaging-6.webp",
  },
];
export const sortedProductsItems = [
  {
    id: nanoid(),
    title: "مرتب‌ سازی براساس امتیاز",
    sortedBy: "rating",
  },
  {
    id: nanoid(),
    title: "مرتب‌ سازی براساس جدیدترین",
    sortedBy: "latest",
  },
  {
    id: nanoid(),
    title: "مرتب‌ سازی براساس ارزان ترین",
    sortedBy: "price-low-to-high",
  },
  {
    id: nanoid(),
    title: "مرتب‌ سازی براساس گران ترین",
    sortedBy: "price-high-to-low",
  },
];
export const brands = {
  digital: {
    tablet: {
      brands: [
        {
          id: nanoid(),
          img: "/images/brands/apple.png",
          title: "apple",
          perTitle: "اپل",
        },
        {
          id: nanoid(),
          img: "/images/brands/asus.png",
          title: "asus",
          perTitle: "ایسوس",
        },
        {
          id: nanoid(),
          img: "/images/brands/lenovo.png",
          title: "lenovo",
          perTitle: "لنوو",
        },
        {
          id: nanoid(),
          img: "/images/brands/samsung.png",
          title: "samsung",
          perTitle: "سامسونگ",
        },
        {
          id: nanoid(),
          img: "/images/brands/xiaomi.png",
          title: "xiaomi",
          perTitle: "شیائومی",
        },
      ],
    },
    camera: {},
    workstation: {},
    laptop: {
      brands: [
        {
          id: nanoid(),
          img: "/images/brands/apple.png",
          title: "apple",
          perTitle: "اپل",
        },
        {
          id: nanoid(),
          img: "/images/brands/asus.png",
          title: "asus",
          perTitle: "ایسوس",
        },
        {
          id: nanoid(),
          img: "/images/brands/lenovo.png",
          title: "lenovo",
          perTitle: "لنوو",
        },
      ],
    },
    phone: {
      brands: [
        {
          id: nanoid(),
          img: "/images/brands/apple.png",
          title: "apple",
          perTitle: "اپل",
        },
        {
          id: nanoid(),
          img: "/images/brands/samsung.png",
          title: "samsung",
          perTitle: "سامسونگ",
        },
        {
          id: nanoid(),
          img: "/images/brands/xiaomi.png",
          title: "xiaomi",
          perTitle: "شیائومی",
        },
      ],
    },
  },
  "household-appliances": {},
};

export const Iran = {
  "آذربايجان شرقي": [
    "آذر شهر",
    "اسكو",
    "اهر",
    "بستان آباد",
    "بناب",
    "بندر شرفخانه",
    "تبريز",
    "تسوج",
    "جلفا",
    "سراب",
    "شبستر",
    "صوفیان",
    "عجبشير",
    "قره آغاج",
    "كليبر",
    "كندوان",
    "مراغه",
    "مرند",
    "ملكان",
    "ممقان",
    "ميانه",
    "هاديشهر",
    "هريس",
    "هشترود",
    "ورزقان",
  ],
  "آذربايجان غربي": [
    "اروميه",
    "اشنويه",
    "بازرگان",
    "بوكان",
    "پلدشت",
    "پيرانشهر",
    "تكاب",
    "خوي",
    "سردشت",
    "سلماس",
    "سيه چشمه- چالدران",
    "سیمینه",
    "شاهين دژ",
    "شوط",
    "ماكو",
    "مهاباد",
    "مياندوآب",
    "نقده",
  ],
  اردبيل: [
    "اردبيل",
    "بيله سوار",
    "پارس آباد",
    "خلخال",
    "سرعين",
    "كيوي (كوثر)",
    "گرمي (مغان)",
    "مشگين شهر",
    "مغان (سمنان)",
    "نمين",
    "نير",
  ],
  اصفهان: [
    "آران و بيدگل",
    "اردستان",
    "اصفهان",
    "باغ بهادران",
    "تيران",
    "خميني شهر",
    "خوانسار",
    "دهاقان",
    "دولت آباد-اصفهان",
    "زرين شهر",
    "زيباشهر (محمديه)",
    "سميرم",
    "شاهين شهر",
    "شهرضا",
    "فريدن",
    "فريدون شهر",
    "فلاورجان",
    "فولاد شهر",
    "قهدریجان",
    "كاشان",
    "گلپايگان",
    "گلدشت اصفهان",
    "گلدشت مركزی",
    "مباركه اصفهان",
    "مهاباد-اصفهان",
    "نايين",
    "نجف آباد",
    "نطنز",
    "هرند",
  ],
  البرز: [
    "آسارا",
    "اشتهارد",
    "شهر جديد هشتگرد",
    "طالقان",
    "كرج",
    "گلستان تهران",
    "نظرآباد",
    "هشتگرد",
  ],
  ايلام: [
    "آبدانان",
    "ايلام",
    "ايوان",
    "دره شهر",
    "دهلران",
    "سرابله",
    "شيروان چرداول",
    "مهران",
  ],
  بوشهر: [
    "آبپخش",
    "اهرم",
    "برازجان",
    "بندر دير",
    "بندر ديلم",
    "بندر كنگان",
    "بندر گناوه",
    "بوشهر",
    "تنگستان",
    "جزيره خارك",
    "جم (ولايت)",
    "خورموج",
    "دشتستان - شبانکاره",
    "دلوار",
    "عسلویه",
  ],
  تهران: [
    "اسلامشهر",
    "بومهن",
    "پاكدشت",
    "تهران",
    "چهاردانگه",
    "دماوند",
    "رودهن",
    "ري",
    "شريف آباد",
    "شهر رباط كريم",
    "شهر شهريار",
    "فشم",
    "فيروزكوه",
    "قدس",
    "كهريزك",
    "لواسان بزرگ",
    "ملارد",
    "ورامين",
  ],
  "چهارمحال بختياري": [
    "اردل",
    "بروجن",
    "چلگرد (كوهرنگ)",
    "سامان",
    "شهركرد",
    "فارسان",
    "لردگان",
  ],
  "خراسان جنوبي": [
    "بشرویه",
    "بيرجند",
    "خضری",
    "خوسف",
    "سرایان",
    "سربيشه",
    "طبس",
    "فردوس",
    "قائن",
    "نهبندان",
  ],
  "خراسان رضوي": [
    "بجستان",
    "بردسكن",
    "تايباد",
    "تربت جام",
    "تربت حيدريه",
    "جغتای",
    "جوین",
    "چناران",
    "خلیل آباد",
    "خواف",
    "درگز",
    "رشتخوار",
    "سبزوار",
    "سرخس",
    "طبس",
    "طرقبه",
    "فريمان",
    "قوچان",
    "كاشمر",
    "كلات",
    "گناباد",
    "مشهد",
    "نيشابور",
  ],
  "خراسان شمالي": [
    "آشخانه، مانه و سمرقان",
    "اسفراين",
    "بجنورد",
    "جاجرم",
    "شيروان",
    "فاروج",
  ],
  خوزستان: [
    "آبادان",
    "اميديه",
    "انديمشك",
    "اهواز",
    "ايذه",
    "باغ ملك",
    "بستان",
    "بندر ماهشهر",
    "بندرامام خميني",
    "بهبهان",
    "خرمشهر",
    "دزفول",
    "رامشیر",
    "رامهرمز",
    "سوسنگرد",
    "شادگان",
    "شوش",
    "شوشتر",
    "لالي",
    "مسجد سليمان",
    "هنديجان",
    "هويزه",
  ],
  زنجان: [
    "آب بر (طارم)",
    "ابهر",
    "خرمدره",
    "زرین آباد (ایجرود)",
    "زنجان",
    "قیدار (خدا بنده)",
    "ماهنشان",
  ],
  سمنان: [
    "ايوانكي",
    "بسطام",
    "دامغان",
    "سرخه",
    "سمنان",
    "شاهرود",
    "شهمیرزاد",
    "گرمسار",
    "مهدیشهر",
  ],
  "سيستان و بلوچستان": [
    "ايرانشهر",
    "چابهار",
    "خاش",
    "راسك",
    "زابل",
    "زاهدان",
    "سراوان",
    "سرباز",
    "ميرجاوه",
    "نيكشهر",
  ],
  فارس: [
    "آباده",
    "آباده طشك",
    "اردكان",
    "ارسنجان",
    "استهبان",
    "اشكنان",
    "اقليد",
    "اوز",
    "ایج",
    "ایزد خواست",
    "باب انار",
    "بالاده",
    "بنارويه",
    "بهمن",
    "بوانات",
    "بيرم",
    "بیضا",
    "جنت شهر",
    "جهرم",
    "حاجي آباد-زرین دشت",
    "خاوران",
    "خرامه",
    "خشت",
    "خفر",
    "خنج",
    "خور",
    "داراب",
    "رونيز عليا",
    "زاهدشهر",
    "زرقان",
    "سده",
    "سروستان",
    "سعادت شهر",
    "سورمق",
    "ششده",
    "شيراز",
    "صغاد",
    "صفاشهر",
    "علاء مرودشت",
    "عنبر",
    "فراشبند",
    "فسا",
    "فيروز آباد",
    "قائميه",
    "قادر آباد",
    "قطب آباد",
    "قير",
    "كازرون",
    "كنار تخته",
    "گراش",
    "لار",
    "لامرد",
    "لپوئی",
    "لطيفي",
    "مبارك آباد ديز",
    "مرودشت",
    "مشكان",
    "مصير",
    "مهر فارس(گله دار)",
    "ميمند",
    "نوبندگان",
    "نودان",
    "نورآباد",
    "ني ريز",
    "کوار",
  ],
  قزوين: [
    "آبيك",
    "البرز",
    "بوئين زهرا",
    "تاكستان",
    "قزوين",
    "محمود آباد نمونه",
  ],
  قم: ["قم"],
  كردستان: [
    "بانه",
    "بيجار",
    "دهگلان",
    "ديواندره",
    "سقز",
    "سنندج",
    "قروه",
    "كامياران",
    "مريوان",
  ],
  كرمان: [
    "بابك",
    "بافت",
    "بردسير",
    "بم",
    "جيرفت",
    "راور",
    "رفسنجان",
    "زرند",
    "سيرجان",
    "كرمان",
    "كهنوج",
    "منوجان",
  ],
  كرمانشاه: [
    "اسلام آباد غرب",
    "پاوه",
    "تازه آباد- ثلاث باباجانی",
    "جوانرود",
    "سر پل ذهاب",
    "سنقر كليائي",
    "صحنه",
    "قصر شيرين",
    "كرمانشاه",
    "كنگاور",
    "گيلان غرب",
    "هرسين",
  ],
  "كهكيلويه و بويراحمد": [
    "دهدشت",
    "دوگنبدان",
    "سي سخت- دنا",
    "گچساران",
    "ياسوج",
  ],
  گلستان: [
    "آزاد شهر",
    "آق قلا",
    "انبارآلوم",
    "اینچه برون",
    "بندر گز",
    "تركمن",
    "جلین",
    "خان ببین",
    "راميان",
    "سرخس کلاته",
    "سیمین شهر",
    "علي آباد كتول",
    "فاضل آباد",
    "كردكوي",
    "كلاله",
    "گالیکش",
    "گرگان",
    "گمیش تپه",
    "گنبد كاووس",
    "مراوه تپه",
    "مينو دشت",
    "نگین شهر",
    "نوده خاندوز",
    "نوکنده",
  ],
  گيلان: [
    "آستارا",
    "آستانه اشرفيه",
    "املش",
    "بندرانزلي",
    "خمام",
    "رشت",
    "رضوان شهر",
    "رود سر",
    "رودبار",
    "سياهكل",
    "شفت",
    "صومعه سرا",
    "فومن",
    "كلاچاي",
    "لاهيجان",
    "لنگرود",
    "لوشان",
    "ماسال",
    "ماسوله",
    "منجيل",
    "هشتپر",
  ],
  لرستان: [
    "ازنا",
    "الشتر",
    "اليگودرز",
    "بروجرد",
    "پلدختر",
    "خرم آباد",
    "دورود",
    "سپید دشت",
    "کوهدشت",
    "نورآباد",
  ],
  مازندران: [
    "آمل",
    "بابل",
    "بابلسر",
    "بلده",
    "بهشهر",
    "پل سفيد",
    "تنكابن",
    "جويبار",
    "چالوس",
    "خرم آباد",
    "رامسر",
    "رستم کلا",
    "ساري",
    "سلمانشهر",
    "سواد كوه",
    "فريدون كنار",
    "قائم شهر",
    "گلوگاه",
    "محمودآباد",
    "مرزن آباد",
    "نكا",
    "نور",
    "نوشهر",
  ],
  مركزي: [
    "آشتيان",
    "اراك",
    "تفرش",
    "خمين",
    "دليجان",
    "ساوه",
    "شازند",
    "محلات",
    "کمیجان",
  ],
  هرمزگان: [
    "ابوموسي",
    "انگهران",
    "بستك",
    "بندر جاسك",
    "بندر لنگه",
    "بندرعباس",
    "پارسیان",
    "حاجي آباد",
    "دشتی",
    "دهبارز (رودان)",
    "قشم",
    "كيش",
    "ميناب",
  ],
  همدان: [
    "اسدآباد",
    "بهار",
    "تويسركان",
    "رزن",
    "كبودر اهنگ",
    "ملاير",
    "نهاوند",
    "همدان",
  ],
  يزد: [
    "ابركوه",
    "اردكان",
    "اشكذر",
    "بافق",
    "تفت",
    "مهريز",
    "ميبد",
    "هرات",
    "يزد",
  ],
};