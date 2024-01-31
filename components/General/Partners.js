'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper";
import { useEffect, useState } from "react"

import base from "lib/base";
import { getPartners } from "lib/getFetchers";

const Partners = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { partners } = await getPartners(`status=true&limit=15`);
            setData(partners)
        }

        fetchData().catch(err => console.log(err))
    }, [])

    return <>
        <section className="partner-section gray">
            <div className="container">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 5000,
                    }}
                    loop={true}
                    slidesPerView={5}
                    breakpoints={{
                        1000: {
                            slidesPerView: 5,
                        },
                        800: {
                            slidesPerView: 4,
                        },
                        700: {
                            slidesPerView: 3,
                        },
                        400: {
                            slidesPerView: 2,
                        },
                        200: {
                            slidesPerView: 1,
                        },
                    }}
                    className="partners-slider"
                >
                    {data &&
                        data.map((el, index) => {

                            return (
                                <SwiperSlide className="partners-item" key={el._id + "partner"} >
                                    <a href={el.link} target="_blank">
                                        <div className="partner-logo-box">
                                            <img src={`${base.cdnUrl}/${el.logo}`} />
                                        </div>
                                    </a>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </section>
    </>

}

export default Partners