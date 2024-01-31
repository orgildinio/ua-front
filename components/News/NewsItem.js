import base from "lib/base"
import Link from "next/link"
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import { useCookies } from "react-cookie";

TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);




const NewsItem = ({ data }) => {
    const [cookies, setCookie] = useCookies(["language"]);


    const langCheck = (val, path) => {
        let lang = cookies.language;
        if (!val[cookies.language]) {
            if (cookies.language == 'mn') lang = 'eng'; else lang = 'mn';
        }
        return lang;
    }

    return <>
        <div className="news-item">
            <Link href={`/post/${data.slug}`} className="news-item-img news-box-image" >
                {data.pictures && data.pictures[0] ? <img src={`${base.cdnUrl}/${data.pictures[0]}`} /> : <img src="/assets/img/no-image.png" />}
            </Link>

            <div className="news-item-content">
                <div className="new-news-categories">
                    {data.categories && data.categories[0] && (
                        <div className={`new-news-category`}>
                            <Link href={`/news?category=${data.categories[0].slug}`}>
                                {data.categories[0][langCheck(data.categories[0])].name}
                            </Link>
                        </div>
                    )}
                </div>
                <div className="news-box-dtls">
                    <div className="news-box-dtl">
                        <i className="fa fa-clock"></i>
                        <ReactTimeAgo date={data.createAt} locale="mn-MN" />
                    </div>
                    <div className="news-box-dtl">
                        <i className="fa fa-bolt"></i>
                        {data.views}
                    </div>
                </div>

                <Link href={`/post/${data.slug}`} className="news-item-title">
                    <h4> {data[langCheck(data)].name}</h4>
                </Link>

                <p>
                    {data[langCheck(data)].shortDetails &&
                        data[langCheck(data)].shortDetails.substring(0, 150)} ...
                </p>
            </div>
        </div >
    </>
}

export default NewsItem