import BlockLoad from "components/General/BlockLoad";
import HeaderSticky from "components/General/HeaderSticky";
import { Suspense } from "react";

export default function RootLayout({ children }) {
    return (
        <>

            <HeaderSticky color="displayBlock" />
            <Suspense fallback={<BlockLoad />}>
                {children}
            </Suspense>
        </>
    );
}
