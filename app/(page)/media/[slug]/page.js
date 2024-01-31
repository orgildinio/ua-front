
'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { faBolt, faClock, faMagnifyingGlass, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactToPrint from "react-to-print";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";

import { getMediaCategories, getNewsCategories, getSlugMedia, getSlugNews } from "lib/getFetchers";
import NotFound from "components/General/Notfound";
import Side from "components/General/Side";
import Spinner from "components/General/Spinner";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import base from "lib/base";
import { FacebookIcon, FacebookShareButton, FacebookShareCount, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, XIcon } from "react-share";


TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);


export default function Page({ params }) {
    const [menus, setMenus] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [cookies, setCookie] = useCookies(["language"]);
    const pathname = usePathname();
    const componentRef = useRef();

    useEffect(() => {
        window.onscroll = () => {
            let header = document.querySelector(".header-two");
            let stickyTop = document.querySelector('.sides.sticky-top')

            if (header && stickyTop) {
                let sticky = ""
                if (header) sticky = header.offsetTop;
                if (window.pageYOffset > sticky) {
                    header.classList.add(`header-sticky`);
                    stickyTop.classList.add('st-top');
                } else {
                    header.classList.remove(`header-sticky`);
                    stickyTop.classList.remove('st-top');
                }
            }
        };

        const fetchData = async () => {
            const { categories } = await getMediaCategories(``);
            categories && setMenus(categories);
            const { media } = await getSlugMedia(params.slug);
            media && setData(media);
            setLoading(false);
        }

        fetchData().catch(err => console.log(err));
        if (!cookies.language) setCookie("language", "mn", { path: "/" });
    }, []);

    const langCheck = (val) => {
        let lang = cookies.language;
        if (!val[cookies.language]) {
            if (cookies.language == "mn") lang = "eng";
            else lang = "mn";
        }
        return lang;
    };

    if (loading) return <Spinner />

    if (!loading && !data) {
        return <>
            <div className="breads">
                <div className="container custom-container">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/" > Эхлэл </Link>
                        </li>
                        <li className="breadcrumb-item active">
                            <Link href="/medias" > Медиа контент</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <NotFound />

        </>
    }

    return <>  <div className="breads">
        <div className="container custom-container">
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/" > Эхлэл </Link>
                </li>
                <li className="breadcrumb-item ">
                    <Link href="/medias" > Медиа контент</Link>
                </li>
                <li className="breadcrumb-item active">
                    {data[langCheck(data)].name}
                </li>
            </ul>
        </div>
    </div>
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 col-lg-12 col-md-12" ref={componentRef}>
                        <div className="page-main">
                            <div className="page-header">
                                <div className="page-title">
                                    <h2>  {data[langCheck(data)].name} </h2>
                                </div>
                                <div className="section-title-line"></div>
                            </div>
                            <div className="page-picture">
                                {data.pictures && data.pictures.length == 1 && <img src={`${base.cdnUrl}/${data.pictures[0]}`} className="page-full-image" />}
                                {data.pictures && data.pictures.length > 1 &&
                                    <Swiper modules={[Navigation]}
                                        autoHeight={true}
                                        navigation={{
                                            prevEl: ".page-view-slider-prev",
                                            nextEl: ".page-view-slider-next",
                                        }}
                                        className="page-view-slider">
                                        {data.pictures.map((pic, index) =>
                                            <SwiperSlide className="page-slide" key={index + "_view"}>
                                                <img src={`${base.cdnUrl}/${pic}`} />
                                            </SwiperSlide>
                                        )}
                                        <div className="page-view-slide-nav">
                                            <div className="page-view-slider-prev swiper-button-prev"></div>
                                            <div className="page-view-slider-next swiper-button-next"></div>
                                        </div>
                                    </Swiper>
                                }
                            </div>

                            <div className="page-infos">
                                <div className="page-info-left">
                                    <div className="page-info">
                                        <ReactToPrint
                                            trigger={() => (
                                                <div className="page-print">
                                                    <FontAwesomeIcon icon={faPrint} ></FontAwesomeIcon>
                                                    Хэвлэх
                                                </div>
                                            )}
                                            content={() => componentRef.current} />
                                    </div>
                                </div>
                                <div className="page-info-right">
                                    <div className="page-info">
                                        <FontAwesomeIcon icon={faBolt} />
                                        {data.views}
                                    </div>
                                    <div className="page-info">
                                        <FontAwesomeIcon icon={faClock} />
                                        <ReactTimeAgo
                                            date={data.createAt}
                                            locale="mn-MN"
                                        />
                                    </div>
                                    <div className="page-info">
                                        <FacebookShareButton url={base.baseUrl + "/" + pathname} > <FacebookIcon size={18} /> </FacebookShareButton>
                                        <TwitterShareButton url={base.baseUrl + "/" + pathname} >  <TwitterIcon size={18} /></TwitterShareButton>
                                        <LinkedinShareButton url={base.baseUrl + "/" + pathname} > <LinkedinIcon size={18} /></LinkedinShareButton>
                                    </div>
                                </div>
                            </div>
                            <div className="row page-desiption">
                                {data.type === "video" &&
                                    data.videos && data.videos.length > 0 &&
                                    data.videos.map((video) => (
                                        <div className="col-md-6">
                                            <video
                                                controls
                                                src={`${base.cdnUrl}/${video}`}
                                                
                                            />
                                        </div>
                                    ))}

                                {data.type === "audio" &&
                                    data.audios && data.audios.length > 0 &&
                                    data.audios((audio) => (
                                        <div className="col-md-12">
                                            <audio
                                                controls
                                                src={`${base.cdnUrl}/${audio}`}
                                            ></audio>
                                        </div>
                                    ))}

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data[langCheck(data)] && data[langCheck(data)].details,
                                    }}
                                    className="page-about"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12 col-md-12 ">
                        <Side >
                            <div className="side-item">
                                <form action={'/medias'} method="get" className="side-search">
                                    <input name="name" placeholder={cookies.language == 'mn' ? "Хайлт хийх..." : "Search..."} />
                                    <button type="submit"> <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                                </form>
                            </div>
                            <div className="side-item ">
                                <div className="side-title">  <h5>{cookies.language == 'mn' ? "Ангилал" : "Categories"}</h5> <div className="section-title-line"></div>  </div>
                                <ul className="side-menus">
                                    {menus && menus.map(menu =>
                                        <li className="side-menu" key={menu._id + "medias"}> <Link href={`/medias?categories=${menu.slug}`} > {menu[langCheck(menu)].name}</Link></li>
                                    )} </ul>
                            </div>
                        </Side>
                    </div>
                </div>
            </div>
        </section></>
}