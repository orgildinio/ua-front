import Partners from "components/General/Partners";
import { getSlugMenu, getWebInfo } from "lib/getFetchers";

export async function generateMetadata({ params }) {
    const { info } = await getWebInfo();
    const { menu, parent, page, childeMenus, sameParentMenus, position } = await getSlugMenu(params.slug);

    let title = `NAOG.GOV.MN`;

    if (info) {
        title = info['mn'].name + " - " + title;
    }

    if (page && page[0]) {
        title = page[0]['mn'].name + title;
    }


    return {
        title,
    };
}

export default function RootLayout({ children }) {



    return (
        <>
            {children}

        </>
    );
}
