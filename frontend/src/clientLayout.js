// "use client"
// import { usePathname } from "next/navigation";
// import Navbar from "./module/components/Navbar";
// import Footer from "./module/components/footer";

// export default function ClientLayout({ children }) {
//     const pathname = usePathname();
//     const hideNavbarRoutes = ["/module/auth"];
//     const shouldHideNavbar = hideNavbarRoutes.some((route) =>
//         pathname.startsWith(route)
//     );

//     return (
//         <>
//             <div className={shouldHideNavbar ? "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]" : "pt-18 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]"}>
//                 {!shouldHideNavbar && <Navbar />}
//                 {children}
//                 {!shouldHideNavbar && <Footer />}
//             </div>
//         </>
//     );
// }
