import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const NotFound = () => {
    return (
        <>
            <section className="section">
                <div className="container custom-container">
                    <div className="notFound">
                        <FontAwesomeIcon icon={faInbox} />
                        <h2> Өгөгдөл олдсонгүй </h2>
                        <p> Танд харуулах өгөгдөл олдсонгүй </p>
                        <Link href="/"> Нүүр хуудас</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotFound;
