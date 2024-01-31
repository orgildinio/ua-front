import base from "lib/base";
import { getFastLinks } from "lib/getFetchers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const NeedLink = () => {
    const [cookies] = useCookies(["language"]);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { fastlinks } = await getFastLinks(`active=true&limit=6`);
            setData(fastlinks)
        }

        fetchData().catch(err => console.log(err))
    }, [])

    return <>
        <section className="section">
            <div className="container">
                <div className="row gy-4">
                    {data && data.map(el => {
                        let lang;
                        if (!el[cookies.language]) {
                            if (cookies.language == "mn") lang = "eng";
                            else lang = "mn";
                        } else lang = cookies.language;

                        return (<div className="col-xl-4 col-lg-6 col-md-6" key={el._id + "needlink"}>
                            <a href={el.direct} className='link'>
                                <div className="fast-link">
                                    <div className="fast-link-top">
                                        <div className="fast-link-icon">
                                            <img src={`${base.cdnUrl}/${el.picture}`} />
                                        </div>
                                        <h4 className="fast-link-title"> {el[lang].name}</h4>
                                    </div>
                                    <div className="fast-link-info">
                                        <p>{el[lang].about}</p>
                                    </div>
                                </div>
                            </a>
                        </div>)
                    })}
                </div>
            </div>
        </section>
    </>
}
export default NeedLink;