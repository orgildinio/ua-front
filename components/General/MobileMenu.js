"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileMenu = ({ menus, info, slinks }) => {
    const [active, setActive] = useState(false);
    const pathname = usePathname();
    const [cookies, setCookie] = useCookies(["language"]);
    const backGo = () => {
        router.back();
    };

    const changeLanguage = (lang) => {
        setCookie("language", lang, { path: "/" });
    };

    const handleToggle = () => {
        setActive((ba) => {
            if (ba === true) return false;
            else return true;
        });
    };

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

    return (
        <>
            <div className="burger__menu" onClick={handleToggle}>
                <span className="line"> </span>
                <span className="line"> </span>
                <span className="line"> </span>
            </div>
            <div
                className={`menuMobile  ${active === true ? "displayBlock" : "displayNone"
                    }`}
            >
                <h5>
                    <FontAwesomeIcon icon={faClose} onClick={handleToggle} /> Үндсэн цэс
                </h5>
                <div className="mobile-language">
                    {cookies.language === "mn" ? (
                        <img src="/images/eng.png" onClick={() => changeLanguage("eng")} />
                    ) : (
                        <img src="/images/mn.png" onClick={() => changeLanguage("mn")} />
                    )}
                </div>
                <ul>{renderMenu(menus)}</ul>
                <div className="contactMobile">
                    {info && (
                        <>
                            <li>
                                <a href={`tel:${info.phone}`}> Утас: {info.phone} </a>
                            </li>
                            <li>
                                <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
                            </li>
                            <li>Хаяг: {info.address}</li>
                        </>
                    )}
                </div>

            </div>
            <div
                className={`menuMobile-bg ${active === true ? "displayBlock" : "displayNone"
                    }`}
                onClick={handleToggle}
            ></div>
        </>
    );
};

export default MobileMenu;
