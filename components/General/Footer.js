"use client";
import base from "lib/base";
import { getFooterMenus, getPrograms, getSocialLinks, getWebInfo } from "lib/getFetchers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Footer = () => {
    const [info, setInfo] = useState({});
    const [socials, setSocialLinks] = useState([]);
    const [programs, setPrograms] = useState([])
    const [menus, setMenus] = useState([])
    const [cookies] = useCookies(["language"]);

    useEffect(() => {
        const fetchData = async () => {
            const { info } = await getWebInfo();
            info && setInfo(info);
            const { socials } = await getSocialLinks();
            socials && setSocialLinks(socials);
            const { menus } = await getFooterMenus();
            menus && setMenus(menus)
        };

        fetchData().catch((err) => console.log(err));
    }, []);

    const renderCategories = (categories, child = false, parentSlug = "") => {
        let myCategories = [];
        let count = 1;

        categories &&
            categories.map((el, index) => {
                let lang;
                if (el[cookies.language].name === undefined) {
                    if (cookies.language == "mn") lang = "eng";
                    else lang = "mn";
                } else lang = cookies.language;

                myCategories.push(
                    <>
                        <div key={el._id + "footer_menu"} className={`${!child && 'footer-box'}`} >
                            {!child && (
                                <div className='footer-title'>{el[lang].name}</div>
                            )}

                            {!el.isDirect && !el.model && child && (
                                <Link href={`/f/${el.slug}`}>
                                    {el[lang].name}
                                </Link>
                            )}

                            {el.isDirect && child && (
                                <a href={el.direct} target="_blank">
                                    {el[lang].name}
                                </a>
                            )}

                            {el.model && child && (
                                <Link href={`/${el.model}`}>
                                    {el[lang].name}
                                </Link>
                            )}
                            {el.children.length > 0 && !child ? (
                                <ul className="footer-links" key={el.slug + "child"}>
                                    {renderCategories(el.children, true, el.slug)}
                                </ul>
                            ) : null}
                        </div>
                        {child === false && count++ === 2 ? (
                            <div className="footer-logo" >
                                <img src="/images/footer-logo.png" />
                            </div>
                        ) : null}
                    </>
                );
            });

        return myCategories;
    };



    return (
        <>
            <footer className='footer'>
                <div className="container">
                    <div className='footer-boxs'>
                        <div className='footer-logo-m'>
                            <img src="/images/footer-logo.png" />
                        </div>
                        {renderCategories(menus)}

                        <div className="footer-box"                        >
                            <div className="footer-contact">
                                <div className="footer-contact-item">
                                    <a href={`callto:${info.phone}`}>
                                        <i className="fa-solid fa-phone"></i>
                                        {info.phone}</a>
                                </div>
                                <div className="footer-contact-item">
                                    <a href={`mailto:${info.email}`}>
                                        <i className="fa-solid fa-envelope"></i>
                                        {info.email}
                                    </a>
                                </div>
                                <div className="footer-contact-socials">
                                    {socials &&
                                        socials.map((el) => (
                                            <a href={el.link} target="_blank" key={el._id + 'fsc'}>
                                                <i className={`fa-brands fa-${el.name.toLowerCase()}`}></i>
                                            </a>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="footer-end">
                {cookies.language === "eng"
                    ? `© ${new Date().getFullYear()} NATIONAL ACADEMY OF GOVERNANCE`
                    : `© ${new Date().getFullYear()} УДИРДЛАГЫН АКАДЕМИ`}
            </div>
        </>
    );
}

export default Footer;