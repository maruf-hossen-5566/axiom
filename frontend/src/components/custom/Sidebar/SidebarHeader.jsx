import React, {useEffect, useState} from 'react';
import Logo from "@/components/custom/Header/Logo.jsx";
import SearchBar from "@/components/custom/Header/SearchBar.jsx";
import NewPostButton from "@/components/custom/Header/NewPostButton.jsx";
import ThemeButton from "@/components/custom/Header/ThemeButton.jsx";
import NotificationButton from "@/components/custom/Header/NotificationButton.jsx";
import {DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import Dropdown from "@/components/custom/Header/Dropdown.jsx";
import useUserStore from "@/store/userStore.js";
import {SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Menu} from "lucide-react";

// const SidebarHeader = ({sidebarOpen, setSidebarOpen}) => {
const SidebarHeader = () => {
    const user = useUserStore((state) => state.user);


    return (
        <div className="w-full sticky top-0 z-[100] bg-white dark:bg-background border-b py-5">
            <div className="w-full mx-auto flex items-center justify-between px-6">
                <div className="w-max flex items-center">
                    <SidebarTrigger className="md:hidden mr-4"/>
                    <Logo/>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <SearchBar/>
                    <NewPostButton/>
                    <ThemeButton/>
                    <NotificationButton/>

                    <div className="flex items-center justify-end gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded-full cursor-pointer">
                                <Avatar>
                                    <AvatarImage
                                        src={user?.avatar || "https://github.com/shadcn.png"}
                                    />
                                    <AvatarFallback className="capitalize">
                                        {user?.full_name[0] || "A"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <Dropdown/>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarHeader;