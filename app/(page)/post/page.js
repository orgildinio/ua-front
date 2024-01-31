'use client'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Side from "components/General/Side";
import NewsList from "components/News/NewsList";
import { getNewsCategories } from "lib/getFetchers";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default async function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(`${searchParams.toString()}`);
    const [menus, setMenus] = useState(null)
    const [cookies, setCookie] = useCookies(["language"]);

    useEffect(() => {
        window.onscroll = () => {
            let header = document.querySelector(".header-two");
            let stickyTop = document.querySelector('.sides.sticky-top')

            if (header && stickyTop) {
                let sticky = ""
                if (header) sticky = header.offsetTop;
                if (window.pageYOffset > sticky) {
                    header.classList.add(`header-sticky`);
                    stickyTop.classList.add('st-top');
                } else {
                    header.classList.remove(`header-sticky`);
                    stickyTop.classList.remove('st-top');
                }
            }
        };

        if (!cookies.language) setCookie("language", "mn", { path: "/" });

        const fetchData = async () => {
            const { newsCategories } = await getNewsCategories(``);
            newsCategories && setMenus(newsCategories);
        }

        fetchData().catch(err => console.log(err))

    }, [])

    const queryLink = (key, event) => {
        urlParams.set(key, event);
        router.push(`${pathname}?${urlParams}`);
    };

    const langCheck = (val) => {
        let lang = cookies.language;
        if (!val[cookies.language]) {
            if (cookies.language == "mn") lang = "eng";
            else lang = "mn";
        }
        return lang;
    };

    return <>
        <div className="breads">
            <div className="container custom-container">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link href="/" > Эхлэл </Link>
                    </li>
                    <li className="breadcrumb-item active">
                        Мэдээ мэдээлэл
                    </li>
                </ul>
            </div>
        </div>
        <section className="section section-page">
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 col-lg-12 col-md-12">
                        <div className="section-header">
                            <div className="section-title">
                                <h3
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            cookies.language === "eng"
                                                ? " <span> News </span>"
                                                : "Мэдээ <span> мэдээлэл </span>",
                                    }}
                                ></h3>
                                <p>
                                    {cookies.language === "eng"
                                        ? "Don't miss daily news"
                                        : "Мэдээ мэдээллээс бүү хоцроорой"}
                                </p>
                            </div>
                            <div className="section-sort">
                                <select className=" form-select sort-select" onChange={(event) => { queryLink(event.target.value.split("=")[0], event.target.value.split("=")[1]) }}>
                                    <option value="sort=createAt:descend" > {cookies.language == 'mn' ? "Сүүлд нэмэгдсэн" : "Lastest"}  </option>
                                    <option value="sort=views:descend"> {cookies.language == 'mn' ? "Их уншигдсан" : "Most read"} </option>
                                </select>
                            </div>
                        </div>
                        <div className="section-title-line"></div>

                        <NewsList />

                    </div>

                    <div className="col-xl-3 col-lg-12 col-md-12 ">
                        <Side >
                            <div className="side-item">
                                <form action={'/news'} method="get" className="side-search">
                                    <input name="name" placeholder={cookies.language == 'mn' ? "Хайлт хийх..." : "Search..."} />
                                    <button type="submit"> <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                                </form>
                            </div>
                            <div className="side-item ">
                                <div className="side-title">  <h5>{cookies.language == 'mn' ? "Ангилал" : "Categories"}</h5> <div className="section-title-line"></div>  </div>
                                <ul className="side-menus">
                                    {menus && menus.map(menu =>
                                        <li className="side-menu" key={menu._id + "news"}> <Link href={`/news?categories=${menu.slug}`} > {menu[langCheck(menu)].name}</Link></li>
                                    )} </ul>
                            </div>
                        </Side>
                    </div>

                </div>
            </div>
        </section>
    </>
}