// CSS Styles
import "bootstrap/dist/css/bootstrap.css";
import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "animate.css";
import "aos/dist/aos.css";
import "styles/fonts.css";

//
import Script from "next/script";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";


//Components

//Context
import { NotificationProvider } from "context/notificationContext";
import Footer from "components/General/Footer";
import Spinner from "components/General/Spinner";
import CustomCursor from "components/Cursor";
import { getWebInfo } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { info } = await getWebInfo();


  let title = `NAOG.GOV.MN`;

  if (info) {
    title = info['mn'].name + " - " + title;
  }


  return {
    title,
  };
}

export default function RootLayout({ children }) {



  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-B2E3N5ZCZQ"></Script>
        <Script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-B2E3N5ZCZQ');
        </Script>
      </head>
      <html lang="en">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        <Script src="/js/scripts.js" />
        <body>
          <Suspense fallback={<Spinner />}>
            <NotificationProvider>
              {children}
              <Footer />
              <CustomCursor />
              {/* <Footer /> */}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </NotificationProvider>
          </Suspense>
        </body>
        <Script
          src="https://kit.fontawesome.com/8c5f1b6ac5.js"
          crossorigin="anonymous"
        ></Script>
        <Script src="/js/scripts.js"></Script>

      </html>
    </>
  );
}
