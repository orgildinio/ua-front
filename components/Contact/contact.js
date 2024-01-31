'use client'
import GoogleMapReact from "google-map-react";
import { Button, Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkedAlt, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getWebInfo } from "lib/getFetchers";
import Spinner from "components/General/Spinner";
import axios from "axios-base";
import { toastControl } from "lib/toastControl";
import { ToastContainer } from "react-toastify";
import { useNotificationContext } from "context/notificationContext";


const Contact = () => {
    const { setError, setAlert, setContentLoad } = useNotificationContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [cookies, setCookie] = useCookies(["language"]);
    const [form] = Form.useForm();
    const requiredRule = {
        required: true,
        message: "Тус талбарыг заавал бөглөнө үү",
    };

    const onFinish = async (values) => {
        try {
            const res = await axios.post('/contacts', values);
            if (res.data) {
                setAlert('Таны санал хүслтийг хүлээн авлаа');
                form.resetFields();
            }
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const { info } = await getWebInfo();
            info && setData(info);
            setLoading(false)
        }

        fetchData().catch(err => console.log(err));
    }, [])

    const AnyReactComponent = ({ text }) => <div>{text}</div>;


    const langCheck = (val) => {
        let lang = cookies.language;
        if (!val[cookies.language]) {
            if (cookies.language == "mn") lang = "eng";
            else lang = "mn";
        }
        return lang;
    };

    if (loading) return <Spinner />


    return <> <div className="row contact-box">
        <div className="col-xl-3 col-md-4">
            <div className="contact-infos">
                <div className="contact-info">
                    <div className="contact-info-text">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <p> {cookies.language == 'eng' ? "Address" : "Хаяг"}  </p>
                    </div>
                    <span> {data[langCheck(data)].address}</span>
                </div>
                <div className="contact-info">
                    <div className="contact-info-text">
                        <FontAwesomeIcon icon={faPhoneAlt} />
                        <p> {cookies.language == 'eng' ? "Phone number" : "Утас"} </p>
                    </div>
                    <a href={`callto:${data.phone}`} > {data.phone}</a>
                </div>
                <div className="contact-info">
                    <div className="contact-info-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p> {cookies.language == 'eng' ? "Email address" : "Имэйл хаяг"} </p>
                    </div>
                    <a href={`mailto:${data.email}`} > {data.email}</a>
                </div>
            </div>
        </div>

        <div className="col-xl-9 col-md-8">
            <Form name="basic" initialValues={{
                remember: true,
            }}
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="contact-form"
            >
                <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-12">
                        <Form.Item name="name" rules={[requiredRule]} label={cookies.language == 'eng' ? "Full name" : "Овог нэр"}>
                            <Input size="large" style={{ width: "100%", borderRadius: "0px" }} placeholder="Өөрийн овог нэрийг оруулна уу." />
                        </Form.Item>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12">
                        <Form.Item name="email" rules={[requiredRule]} label={cookies.language == 'eng' ? "Email address" : "Имэйл хаяг"}>
                            <Input size="large" style={{ width: "100%", borderRadius: "0px" }} placeholder="Өөрийн овог нэрийг оруулна уу." />
                        </Form.Item>
                    </div>
                    <div className="col-xl-12 col-md-12 col-sm-12">
                        <Form.Item name="phoneNumber" rules={[requiredRule]} label={cookies.language == 'eng' ? "Phone number" : "Утасны дугаар"}>
                            <InputNumber size="large" style={{ width: "100%", borderRadius: "0px" }} placeholder="Утасны дугаараа оруулна уу." />
                        </Form.Item>
                    </div>
                    <div className="col-xl-12 col-md-12 col-sm-12">
                        <Form.Item name="message" rules={[requiredRule]} label={cookies.language == 'eng' ? "Message" : "Санал хүсэлт"}>
                            <TextArea style={{ height: "150px", borderRadius: "0px" }} />
                        </Form.Item>
                    </div>
                    <div className="col-xl-12 col-md-12">
                        <Button
                            size="large"
                            htmlType="submit"
                            className="send-btn"
                            style={{ borderRadius: "0px" }}
                        >
                            {cookies.language == 'eng' ? "Send" : "Илгээх"}
                        </Button>
                    </div>
                </div>
            </Form>
        </div >

    </div >
        <div
            style={{
                height: "400px",
                width: "100%",
                padding: "10px",
                boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
            }}
            className={`wow animate__animated animate__fadeInDown`}
            data-wow-delay={`0.5s`}
        >
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw",
                }}
                defaultZoom={16}
                defaultCenter={{
                    lat: 47.89591117918217,
                    lng: 106.91511278045269,
                }}
            >
                <AnyReactComponent
                    lat={47.89591117918217}
                    lng={106.91511278045269}
                    text={<img src="/favicon.ico" />}
                />
            </GoogleMapReact>

        </div></>

}

export default Contact