"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";
import { useEffect, useState } from "react";
import { getBanners, getSocialLinks } from "lib/getFetchers";
import { useCookies } from "react-cookie";
import base from "lib/base";


const Banner = () => {
  const [cookies] = useCookies(["language"]);
  const [data, setData] = useState(null);
  const [socialLinks, setSocialLinks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { banners } = await getBanners(`status=true`);
      banners && setData(banners);
      const { socials } = await getSocialLinks();
      socials && setSocialLinks(socials)
    }
    fetchData().catch(err => console.log(err));
  }, [])

  return (
    <>
      <Swiper modules={[EffectFade, Pagination, Navigation, Scrollbar, Autoplay]}
        effect="fade"
        autoplay={{
          delay: 3500,
        }}
        loop={true}
        className="header-slider"
        pagination={{
          el: ".slider_pagination",
          type: "custom",
          renderCustom: function (swiper, current, total) {
            let indT = total >= 10 ? total : `0${total}`;
            let indC = total >= 10 ? current : `0${current}`;
            return `<b> ${indC} </b> <span></span> ${indT}`;
          },
          clickable: true,
        }}
        scrollbar={{
          el: ".slider__scrollbar",
          draggable: false,
        }}
        navigation={{ prevEl: ".slider__prev", nextEl: ".slider__next" }}
      >
        {data && data.map(banner => {
          let lang;
          if (banner[cookies.language] === undefined) {
            if (cookies.language == "mn") lang = "eng";
            else lang = "mn";
          } else lang = cookies.language;


          return (<SwiperSlide className="header-slide" key={banner._id + "banner"}>
            <div className="header-slide-content">
              <span className="silde__headText">
                {cookies.language === "mn" ? "Тавтай морил" : "WELCOME TO"}
              </span>
              <h4 className="slide__title">{banner[lang].name}</h4>
              <p className="slide__text">{banner[lang].details}</p>
              {banner.link && (
                <a href={banner.link} target="_blank">
                  <button className={`btn bannerBtn btn__defualt`}>
                    {cookies.language === "mn" ? "Дэлгэрэнгүй" : "More"}
                  </button>
                </a>
              )}
            </div>
            <div className="image-box">
              <div className="image-box-bg"></div>
              <img src={`${base.cdnUrl}/${banner.banner}`} />
            </div>
          </SwiperSlide>)
        })}
        <div className=" slider__bottom">
          <div className="slider__pagination-wrapper">
            <div className=" swiper-pagination slider_pagination"></div>
          </div>
          <div className="slider__scrollbar_box">
            <div className="slider__scrollbar swiper-scrollbar"></div>
          </div>
          <div className="slider__nav">
            <div className="slider__prev swiper-button-prev"></div>
            <div className="slider__next swiper-button-next"></div>
          </div>
        </div>
        <div className="social_links">
          {socialLinks &&
            socialLinks.map((el) => (
              <a href={el.link} target="_blank" key={el._id + "social"}>
                <i className={`fa-brands fa-${el.name.toLowerCase()}`}></i>
              </a>
            ))}
        </div>
      </Swiper>
    </>
  );
};

export default Banner;
