import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button} from "@/components/ui/button.jsx";
import {Moon, Sun} from "lucide-react";
import useThemeStore from "@/store/themeStore.js";

const ThemeButton = () => {
    const isDarkMode = useThemeStore(state => state.isDarkMode)
    const setIsDarkMode = useThemeStore(state => state.setIsDarkMode)


    useEffect(() => {
        const html = document.documentElement

        if (isDarkMode) {
            html.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            html.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }


    return (

        <Button
            size={"icon"}
            variant={"ghost"}
            className={"cursor-pointer rounded-full duration-0"}
            onClick={toggleTheme}
        >
            {isDarkMode ? <Sun className={"pointer-events-none"}/> : <Moon className={"pointer-events-none"}/>}
        </Button>

    );
};

export default ThemeButton;