"use client";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSocialLinks, getWebInfo } from "lib/getFetchers";
import { useEffect, useState } from "react";

const Topbar = () => {
  const [info, setInfo] = useState({});
  const [socials, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { info } = await getWebInfo();
      info && setInfo(info);
      const { socials } = await getSocialLinks();
      socials && setSocialLinks(socials);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container custom-container">
          <div className="topbar-items">
            <div className="topbar-item">
              <ul className="topbar-contacts">
                <li>
                  <FontAwesomeIcon icon={faPhone} className="topbar-icon" />
                  <a href={`tel:${info.phone}`}> (+976) {info.phone} </a>{" "}
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} className="topbar-icon" />
                  <a href={`mailto:${info.email}`}>{info.email}</a>
                </li>
              </ul>
            </div>
            <div className="topbar-item topbar-links">
              {socials.map((social) => (
                <a
                  href={social.link}
                  target="_blank"
                  className="topbar-s-link"
                  key={social._id}
                >
                  <i className={`fa fa-${social.name} topbar-icon-s`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
