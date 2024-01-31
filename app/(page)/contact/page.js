'use client'
import Contact from "components/Contact/contact";
import Link from "next/link";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default async function Page() {
    const [cookies, setCookie] = useCookies(["language"]);
    useEffect(() => {
        window.onscroll = () => {
            let header = document.querySelector(".header-two");

            if (header) {
                let sticky = ""
                if (header) sticky = header.offsetTop;
                if (window.pageYOffset > sticky) {
                    header.classList.add(`header-sticky`);
                } else {
                    header.classList.remove(`header-sticky`);
                }
            }
        };

        if (!cookies.language) setCookie("language", "mn", { path: "/" });

    }, [])

    return <>     <div className="breads">
        <div className="container custom-container">
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/" > Эхлэл </Link>
                </li>
                <li className="breadcrumb-item active">
                    Холбоо барих
                </li>
            </ul>
        </div>
    </div>

        <section className="section section-page">

            <div className="container">
                {/* <Contact /> */}
            </div>
        </section> </>
}