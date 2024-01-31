"use client";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getNews } from "lib/getFetchers";

import BlockLoad from "../General/BlockLoad";
import NotFound from "../General/Notfound";
import NewsItem from "./NewsItem";
import Link from "next/link";

const NewsList = ({ plusQuery = "plus=none" }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(`${searchParams.toString()}`);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    //-- PAGINATION
    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState({});
    const [total, setTotal] = useState();
    const [paginate, setPaginate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const qry = queryBuild();
            const { news, pagination } = await getNews(`${qry}&${plusQuery}`);
            if (news) setData(news);
            if (pagination) setPaginate(pagination);
            setLoading(false);
        };
        fetchData().catch((error) => console.log(error));
        setActivePage(1)
    }, []);

    useEffect(() => {
        if (paginate) {
            setTotal(paginate.total);
            setLimit(paginate.limit);
        }
    }, [paginate])



    const handlePageChange = (pageNumber) => {
        window.scrollTo(0, 0);
        queryLink('page', pageNumber);
        setActivePage(pageNumber);
    };

    const queryLink = (key, event) => {
        urlParams.set(key, event);
        router.push(`${pathname}?${urlParams}`);
    };



    const queryBuild = () => {
        let query = "status=true&";
        let fields = [];

        const searchFields = ["category", "categories", "name", 'page'];
        if (searchParams.get('page')) setActivePage(parseInt(searchParams.get('page')));

        searchFields.map((field) => {
            if (searchParams.get(field)) {
                query += `${field}=${searchParams.get(field)}&`;
                if (
                    searchParams.get(field) &&
                    searchParams.get(field).split(",").length > 0
                ) {
                    searchParams
                        .get(field)
                        .split(",")
                        .map((el) => fields.push({ name: field, data: el }));
                } else {
                    query += `${field}=&`;
                }
            }
        });

        return query;
    };

    useEffect(() => {
        const fetchData = async (query) => {
            setLoading(true);
            const { news, pagination } = await getNews(
                query + "&" + plusQuery
            );
            setPaginate(pagination);
            setData(news);
            setLoading(false);
        };

        if (searchParams.toString()) {
            const qry = queryBuild();
            fetchData(qry).catch((error) => console.log(error));
        }
    }, [searchParams]);


    if (loading === true) {
        return <BlockLoad />;
    }

    if (loading === true && data.length <= 0) {
        return <BlockLoad />;
    }

    if (data && data.length <= 0) {
        return <NotFound />;
    }

    return (
        <>
            <div className="news-list">
                {searchParams.get('name') &&
                    <div className="search-key">
                        <h6> Хайлт: <span> {searchParams.get('name')} </span> </h6>

                    </div>
                }
                <div className="row gy-4">
                    {data &&
                        data.map((el) => (
                            <div className="col-xl-12 col-lg-12 col-sm-12 col-12" key={el._id}>
                                <NewsItem data={el} />
                            </div>
                        ))}
                </div>
            </div >
            <div className="pagination-main">
                <Pagination
                    activePage={activePage}
                    itemClass={`page-item`}
                    linkClass={"page-link"}
                    itemsCountPerPage={limit}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange.bind()}
                />
            </div>

        </>
    );
};

export default NewsList;
