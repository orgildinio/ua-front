'use client'
import AOS from 'aos';
import Banner from 'components/Home/Banner';
import Header from 'components/General/Header';
import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import FastLink from 'components/Home/FastLink';
import NeedLink from 'components/Home/NeedLink';
import TopNews from 'components/Home/TopNews';
import Media from 'components/Home/Media';
import Books from 'components/Home/Books';
import Partners from 'components/General/Partners';
import HeaderSticky from 'components/General/HeaderSticky';

export default function Page() {
  const [cookies, setCookie] = useCookies(["language"]);

  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".header");
      let headertwo = document.querySelector('.header-two')
      let sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add(`displayNone`);
        headertwo.classList.add('header-sticky');
      }
      else { header.classList.remove(`displayNone`); headertwo.classList.remove('header-sticky'); }
    };
    if (!cookies.language) setCookie("language", "mn", { path: "/" });
    AOS.init();
  }, [])

  return (
    <>
      <section className='header-section'>
        <Header />
        <HeaderSticky />
        <Banner />
        <FastLink />
      </section>
      <NeedLink />
      <TopNews />
      <Media />
      <Books />
      <Partners />
    </>
  );
}
