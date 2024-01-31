'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import base from "lib/base";
import { getNews } from "lib/getFetchers";

import { faBolt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import { useCookies } from "react-cookie";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);


const Side = ({ children }) => {
    const [cookies, setCookie] = useCookies(["language"]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { news } = await getNews(`limit=5`);
            setNews(news)
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

    return <> <div className="sides sticky-top">
        {children}
        <div className="side-item news-sides">
            <div className="side-title">  <h5> {cookies.language == 'mn' ? "Шинэ мэдээлэл" : "Lastest news"} </h5> <div className="section-title-line"></div>  </div>
            {news && news.map(el =>
                <div className="news-side-item" key={el._id}>

                    <div className="news-side-content">
                        <Link href={`/post/${el.slug}`}>
                            <h6>  {el[langCheck(el)].name &&
                                el[langCheck(el)].name.substring(0, 70)}{el[langCheck(el)].name.length > 70 && "..."}</h6>
                        </Link>
                        <div className="news-side-dtl">
                            <li>
                                <FontAwesomeIcon icon={faBolt} /> {el.views}
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faClock} />
                                <ReactTimeAgo date={el.createAt} locale="mn" />
                            </li>
                        </div>
                    </div>
                    <Link href={`/post/${el.slug}`}>
                        <div className="news-side-picture">
                            {el.pictures && el.pictures[0] ? (
                                <img src={`${base.cdnUrl}/150x150/${el.pictures[0]}`} />
                            ) : (
                                <img src="/assets/img/no-image.png" />
                            )}
                        </div>
                    </Link>
                </div>)}
        </div>
    </div></>
}

export default Side;