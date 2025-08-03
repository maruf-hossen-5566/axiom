import Header from "@/components/custom/Header/Header.jsx";
import FeaturedPost from "@/components/custom/Post/Featured/FeaturedPost.jsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/sonner.jsx";

const Layout = () => {
    return (<>
        <Header/>
        <Outlet/>
    </>);
};

export default Layout;