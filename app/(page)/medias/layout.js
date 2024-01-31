import Partners from "components/General/Partners";
import { getWebInfo } from "lib/getFetchers";

export async function generateMetadata({ params }) {
    const { info } = await getWebInfo();

    let title = `NAOG.GOV.MN`;
    if (info) {
        title = "Медиа - " + info['mn'].name + " - " + title;
    }


    return {
        title,
    };
}

export default function RootLayout({ children }) {



    return (
        <>
            {children}
            <Partners />
        </>
    );
}
