'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import base from "lib/base";
import { Coverflow, Navigation, Autoplay, Pagination, Scrollbar } from "swiper";

import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import { getMedias } from "lib/getFetchers";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const Media = () => {
    const [data, setData] = useState(null)
    const [type, setType] = useState('all')
    const [cookies] = useCookies(["language"]);


    useEffect(() => {
        const fetchData = async () => {
            const { medias } = await getMedias(`limit=10`)
            setData(medias)
        }
        fetchData().catch(err => console.log(err))
    }, [])

    const handleType = async (type) => {
        setType(type);
        const { medias } = await getMedias(`type=${type}&limit=10`);
        medias && setData(medias);
    }

    const langCheck = (val) => {
        let lang = cookies.language;
        if (!val[cookies.language]) {
            if (cookies.language == "mn") lang = "eng";
            else lang = "mn";
        }
        return lang;
    };



    return <>
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <div className="section-title">
                        <h3
                            dangerouslySetInnerHTML={{
                                __html:
                                    cookies.language === "eng"
                                        ? "Media <span> content </span>"
                                        : "Медиа <span> контент </span>",
                            }}
                        ></h3>
                        <p>
                            {cookies.language === "eng"
                                ? "Don't miss daily news"
                                : "Мэдээ мэдээллээс бүү хоцроорой"}
                        </p>
                    </div>
                    <div className="section-see-more">
                        <Link href="/medias">  {cookies.language === "eng"
                            ? "Read all media"
                            : "Бүдийг үзэх"} </Link>
                    </div>
                </div>
                <div className="section-title-line"></div>
                <div className="media-slide-types">
                    <button className={`${type == 'all' && 'active'}`} onClick={() => handleType('all')}> Бүгд </button>
                    <button className={`${type == 'audio' && 'active'}`} onClick={() => handleType('audio')}> Подкаст </button>
                    <button className={`${type == 'video' && 'active'}`} onClick={() => handleType('video')}> Видео </button>
                </div>
                <Swiper
                    modules={[Pagination, Navigation, Scrollbar, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    autoplay={{
                        delay: 4000,
                    }}
                    loop={true}
                    preventInteractionOnTransition={true}
                    scrollbar={{
                        el: ".media-slider-scrollbar",
                        draggable: true,
                    }}
                    breakpoints={{
                        1000: {
                            slidesPerView: 3,
                        },
                        700: {
                            slidesPerView: 2,
                        },
                        200: {
                            slidesPerView: 1,
                        },
                    }}
                    className="media-slider"
                >
                    {data && data.map(el =>
                        <SwiperSlide
                            className="media-slide"
                            key={el._id + "media"}
                        >
                            <Link href={`/media/${el.slug}`}>
                                <div className="news-box-image media-slide-image">
                                    {el.type !== "default" && (
                                        <div className="media-type">
                                            <i className={`fa-solid  ${el.type === "picture" && "fa-image"
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
                            <div className="media-slide-details">
                                <Link href={`/media/${el.slug}`}>
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
                        </SwiperSlide>)}
                </Swiper>
            </div>
        </section></>
}

export default Media;