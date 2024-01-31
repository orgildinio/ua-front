"use client";
import base from "lib/base";
import { getSocialLinks, getWebInfo, getMenus } from "lib/getFetchers";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default ({ color = '' }) => {
    const [cookies, setCookie] = useCookies(["language"]);
    const [menus, setMenu] = useState({});
    const [info, setInfo] = useState(null);
    const [socials, setSocialLinks] = useState([]);
    const [logo, setLogo] = useState(null)
    const [whiteLogo, setWhiteLogo] = useState(null)
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            const { info } = await getWebInfo();
            info && setInfo(info);
            const { menus } = await getMenus();
            menus && setMenu(menus);
            const { socials } = await getSocialLinks();
            socials && setSocialLinks(socials);
        };

        fetchData().catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (info) {
            if (info[cookies.language] && info[cookies.language].whiteLogo) {
                setWhiteLogo(`${base.cdnUrl}/${info[cookies.language].whiteLogo}`)
            } else if (cookies.language == 'mn') {
                setWhiteLogo(`${base.cdnUrl}/${info['eng'].whiteLogo}`)
            } else {
                setWhiteLogo(`${base.cdnUrl}/${info['mn'].whiteLogo}`)
            }
            if (info[cookies.language] && info[cookies.language].logo) {
                setLogo(`${base.cdnUrl}/${info[cookies.language].logo}`)
            } else if (cookies.language == 'mn') {
                setLogo(`${base.cdnUrl}/${info['eng'].logo}`)
            } else {
                setLogo(`${base.cdnUrl}/${info['mn'].logo}`)
            }
        }
    }, [info, cookies.language]);

    const renderMenu = (categories, child = false, parentSlug = "") => {

        let myCategories = [];
        categories && categories.length > 0 &&
            categories.map((el) => {
                let lang;
                if (el[cookies.language] && el[cookies.language].name) {
                    lang = cookies.language;
                } else if (cookies.language == "mn") lang = "eng";
                else lang = "mn";

                myCategories.push(
                    <li key={el._id} className={`menu-item ${el.children.length > 0 && "dropMenu"}`}>
                        {el.isDirect && (
                            <Link
                                href={el.direct}
                                target="_blank"
                                className={`header-link ${el.direct === pathname && "active"}`}
                            >
                                {el[lang].name}
                            </Link>
                        )}
                        {el.model && (
                            <Link
                                href={`/${el.model}`}
                                className={`header-link ${"/" + el.model === pathname && "active"}`}
                            >
                                {el[lang].name}
                            </Link>
                        )}

                        {!el.isDirect && !el.model && (
                            <Link
                                href={`/p/${el.slug}`}
                                className={`header-link ${"/p/" + el.slug === pathname && "active"}`}
                            >
                                {el[lang].name}
                            </Link>
                        )}

                        {el.children.length > 0 && !child ? (
                            <ul className={` animate__animated animate__fadeIn animate__fast dropdownMenu`}>
                                {renderMenu(el.children, true, el.slug)}
                            </ul>
                        ) : null}
                    </li>
                );
            });

        return myCategories;
    };

    const changeLanguage = (lang) => {
        setCookie("language", lang, { path: "/" });
    };



    return (
        <>
            <header className={`header-two  ${color}`}>

                <div className="container ">
                    <div className="header-style-2">
                        <div className="header-logo-box">
                            <Link href="/" className="">
                                <img src={logo} />
                            </Link>
                        </div>
                        <ul className="header-menus">
                            <li>

                                <Link href="/"
                                    className={`header-link ${"/" == pathname && "active"}`}
                                >
                                    {cookies.language === "eng" ? "Home" : "Эхлэл"}
                                </Link>
                            </li>
                            {renderMenu(menus)}
                            <div className="change-language">
                                {cookies.language === "mn" ? (
                                    <img src="/images/eng.png" onClick={() => changeLanguage("eng")} />
                                ) : (
                                    <img src="/images/mn.png" onClick={() => changeLanguage("mn")} />
                                )}
                            </div>
                        </ul>
                        <MobileMenu menus={menus} info={info} />
                    </div>
                </div>
            </header>
        </>
    );
};
