import React, {useLayoutEffect} from 'react';
import {Outlet} from "react-router-dom";
import useThemeStore from "@/store/themeStore.js";
import {Tooltip} from "@/components/ui/tooltip.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";

const BaseLayout = () => {
    const isDarkMode = useThemeStore(state => state.isDarkMode)

    useLayoutEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        }
    }, []);

    return <div className={"bg-background"}>
        <Outlet/>
        <Toaster
            position="bottom-right"
            closeButton={true}
            richColors={true}
        />
    </div>
};

export default BaseLayout;