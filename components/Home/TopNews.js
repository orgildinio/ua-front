'use client'
import { Coverflow, Navigation, Autoplay, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import Link from "next/link";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getNews } from "lib/getFetchers";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import base from "lib/base";

TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const TopNews = () => {
    const [cookies] = useCookies(["language"]);
    const [data, setData] = useState(null);
    const [tops, setTops] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { news } = await getNews(`status=true&limit=7`);
            const { news: tops } = await getNews(`status=true&star=true&limit=5`);
            setTops(tops);
            setData(news);
        }
        fetchData().catch(err => console.log(err))
    }, [])

    const langCheck = (val, path) => {
        let lang = cookies.language;
        if (!val[cookies.language]) {
            if (cookies.language == 'mn') lang = 'eng'; else lang = 'mn';
        }
        return lang;
    }

    return <><section className="section gray">
        <div className="container">
            <div className="section-header">
                <div className="section-title">
                    <h3
                        dangerouslySetInnerHTML={{
                            __html:
                                cookies.language === "eng"
                                    ? "Lastest <span> News </span>"
                                    : "Шинэ <span> мэдээлэл </span>",
                        }}
                    ></h3>
                    <p>
                        {cookies.language === "eng"
                            ? "Don't miss daily news"
                            : "Мэдээ мэдээллээс бүү хоцроорой"}
                    </p>
                </div>
                <div className="section-see-more">
                    <Link href="/news">  {cookies.language === "eng"
                        ? "Read all news"
                        : "Бүх мэдээг унших"} </Link>
                </div>
            </div>
            <div className="section-title-line"></div>

            <div className="row">
                <div className="col-xl-5 col-lg-6 col-md-12">
                    <Swiper
                        modules={[Pagination, Navigation, Scrollbar, Autoplay]}
                        preventInteractionOnTransition={true}
                        autoplay={{
                            delay: 3000,
                        }}
                        scrollbar={{
                            el: ".top-news-slide__scrollbar",
                            draggable: true,
                        }}
                        className="top-news-slide">
                        {tops && tops.map(el => <SwiperSlide
                            className="top-news-slide"
                            key={el._id + "top"}
                        >
                            <div className="top-news-box">
                                <Link href={`/post/${el.slug}`}>
                                    <div className=" news-box-image top-news-image">
                                        {el.type !== "default" && (
                                            <div className="news__typeBg">
                                                <i
                                                    className={`fa-solid  
                                                        ${el.type === "picture" && "fa-image"
                                                        }  ${el.type === "video" && "fa-play"
                                                        } ${el.type === "audio" && "fa-music"
                                                        }`}
                                                ></i>
                                            </div>
                                        )}
                                        {el.pictures && el.pictures[0] ?
                                            <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} /> : <img src={`/assets/img/no-image.png`} />
                                        }
                                    </div>
                                </Link>
                                <div className="top-news-box-dtls">
                                    <div className="top-news-box-ctgrs">
                                        {el.categories && el.categories.map(cat =>
                                            <Link href={`/news?category=${cat._id}`} className="top-news-box-cat" key={cat._id + 'tcat'}>  {cat[langCheck(cat)].name} </Link>
                                        )}
                                    </div>
                                    <Link href={`/post/${el.slug}`} className="top-news-title">
                                        <h4> {el[langCheck(el)].name}</h4>
                                    </Link>
                                    <div className="news-box-dtls">
                                        <div className="news-box-dtl">
                                            <i className="fa fa-clock"></i>
                                            <ReactTimeAgo date={el.createAt} locale="mn-MN" />
                                        </div>
                                        <div className="news-box-dtl">
                                            <i className="fa fa-bolt"></i>
                                            {el.views}
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    {el[langCheck(el)].shortDetails &&
                                        el[langCheck(el)].shortDetails.substring(0, 150)} ...
                                </p>
                            </div>
                        </SwiperSlide>)}
                    </Swiper>
                </div>
                <div className="col-xl-7 col-lg-6 col-md-12">
                    <div className="new-news-slider-box">
                        <Swiper
                            direction={"vertical"}
                            modules={[Autoplay, Navigation]}
                            slidesPerView={3}
                            mousewheel={{
                                releaseOnEdges: false,
                            }}
                            navigation={{
                                prevEl: ".new-news-slider-prev",
                                nextEl: ".new-news-slider-next",
                            }}
                            autoplay={{
                                delay: 5000,
                            }}
                            className="new-news-slider"
                        >
                            {data && data.map(el =>
                                <SwiperSlide
                                    className="new-news-slide"
                                    key={el._id + "new"}
                                >
                                    <div className="new-news-about">
                                        <div className="new-news-categories">
                                            {el.categories && el.categories[0] && (
                                                <div className={`new-news-category`}>
                                                    <Link href={`/news?category=${el.slug}`}>
                                                        {el.categories[0][langCheck(el.categories[0])].name}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <Link href={`/post/${el.slug}`} className="new-news-title" >
                                            {el[langCheck(el)].name &&
                                                el[langCheck(el)].name.substring(
                                                    0,
                                                    64
                                                )}
                                            {el[langCheck(el)].name.length > 64 && '...'}
                                        </Link>
                                        <div className="news-box-dtls">
                                            <div className="news-box-dtl">
                                                <i className="fa fa-clock"></i>
                                                <ReactTimeAgo date={el.createAt} locale="mn-MN" />
                                            </div>
                                            <div className="news-box-dtl">
                                                <i className="fa fa-bolt"></i>
                                                {el.views}
                                            </div>
                                        </div>
                                        <p className="new-news-short">
                                            {el[langCheck(el)].shortDetails &&
                                                el[langCheck(el)].shortDetails.substring(
                                                    0,
                                                    150
                                                )}
                                            ...
                                        </p>
                                    </div>
                                    <Link href={`/post/${el.slug}`}>
                                        <div className="news-box-image new-news-image-box">
                                            {el.type !== "default" && (
                                                <div className="news__typeBg">
                                                    <i
                                                        className={`fa-solid  ${el.type === "picture" && "fa-image"
                                                            }  ${el.type === "video" && "fa-play"} ${el.type === "audio" && "fa-music"
                                                            }`}
                                                    ></i>
                                                </div>
                                            )}
                                            {el.pictures && el.pictures[0] ?
                                                <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} /> : <img src={`/assets/img/no-image.png`} />
                                            }
                                        </div>
                                    </Link>
                                </SwiperSlide>)}
                        </Swiper>
                        <div className="new-news-nav">
                            <div className="new-news-slider-prev swiper-button-prev"></div>
                            <div className="new-news-slider-next swiper-button-next"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </section ></>
}
export default TopNews