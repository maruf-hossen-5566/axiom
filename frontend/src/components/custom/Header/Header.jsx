import React from 'react';
import Logo from "@/components/custom/Header/Logo.jsx";
import ThemeButton from "@/components/custom/Header/ThemeButton.jsx";
import {Button} from "@/components/ui/button.jsx";
import SearchBar from "@/components/custom/Header/SearchBar.jsx";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={"w-full sticky top-0 z-[100] bg-zinc-950 border-b py-5"}>
            {/*<div className={"max-w-screen-xl w-full mx-auto flex items-center justify-between px-6"}>*/}
            <div className={"w-full mx-auto flex items-center justify-between px-6"}>
                <Logo/>


                <div className={"flex items-center justify-end gap-2"}>
                    <SearchBar/>
                    <ThemeButton/>
                    <Button asChild>
                        <Link to={"login"}>
                            Login
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link to={"signup"}>
                            Sign Up
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;