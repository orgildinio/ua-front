'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { getBooks } from "lib/getFetchers";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import base from "lib/base";

const Books = () => {
    const [data, setData] = useState(null)
    const [cookies] = useCookies(["language"]);

    useEffect(() => {
        const fetchData = async () => {
            const { books } = await getBooks(`status=true&limit=8`);
            setData(books)
        }

        fetchData().catch(err => console.log(err))
    }, [])

    return <>
        <section className="section gray">
            <div className="container">

                <div className="section-header">
                    <div className="section-title">
                        <h3
                            dangerouslySetInnerHTML={{
                                __html:
                                    cookies.language === "eng"
                                        ? "Online <span> library </span>"
                                        : "Цахим <span> номын сан </span>",
                            }}
                        ></h3>
                        <p>
                            {cookies.language === "eng"
                                ? "Don't miss daily news"
                                : "Мэдээ мэдээллээс бүү хоцроорой"}
                        </p>
                    </div>
                    <div className="section-see-more">
                        <a href="http://catalog.naog.gov.mn/" target="_blank">  {cookies.language === "eng"
                            ? "Read all "
                            : "Бүдийг үзэх"} </a>
                    </div>
                </div>
                <div className="section-title-line"></div>
                <Swiper
                    loop={true}
                    slidesPerView={2}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2000,
                    }}
                    breakpoints={{
                        1000: {
                            slidesPerView: 2,
                        },
                        986: {
                            slidesPerView: 1,
                        },
                        782: {
                            slidesPerView: 1,
                        },
                        500: {
                            slidesPerView: 1,
                        },
                        400: {
                            slidesPerView: 1,
                        },
                        300: {
                            slidesPerView: 1,
                        },
                        200: {
                            slidesPerView: 1,
                        },
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="book-slider"
                >
                    {data && data.length > 0 &&
                        data.map((el) => {
                            return (
                                <SwiperSlide className="book-item" key={el._id + "Book"}>
                                    <a href={el.link} className="book-item-box" target="_blank">
                                        <img src={`${base.cdnUrl}/${el.picture}`} />
                                        <div className="book-slider-text">
                                            <h5>{el.name}</h5>
                                            <p>{el.about}</p>
                                        </div>
                                    </a>

                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </section> </>
}

export default Books