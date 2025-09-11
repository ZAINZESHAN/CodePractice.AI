'use client'

import { usePathname } from "next/navigation"
import Navbar from "./Navbar";
import Footer from "./Footer";

const ClientLayout = ({ children }) => {
    const pathName = usePathname()
    const hideLayoutRoutes = ["/routes/student-signup", "/routes/login", "/routes/comproot-signup", "/routes/compuser-signup"];
    const shouldHideLayout = hideLayoutRoutes.some((route) =>
        pathName.startsWith(route)
    )
    return (
        <>
            {!shouldHideLayout && <Navbar />}
            <div className={shouldHideLayout ? "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]" : "pt-18 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]"}>
                {children}
            </div>
            {!shouldHideLayout && <Footer />}
        </>
    )
}

export default ClientLayout;