import Logo from "@/components/custom/Header/Logo.jsx";
import ThemeButton from "@/components/custom/Header/ThemeButton.jsx";
import {Button} from "@/components/ui/button.jsx";
import SearchBar from "@/components/custom/Header/SearchBar.jsx";
import {Link} from "react-router-dom";
import useUserStore from "@/store/userStore.js";
import {DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.jsx";
import Dropdown from "@/components/custom/Header/Dropdown.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import NewPost from "@/components/custom/Header/NewPost.jsx";

const Header = () => {
    const user = useUserStore(state => state.user)
    const isAuthenticated = useUserStore(state => state.isAuthenticated)

    return (<div className={"w-full sticky top-0 z-[100] bg-zinc-950 border-b py-5"}>
        <div className={"w-full mx-auto flex items-center justify-between px-6"}>
            <Logo/>


            <div className={"flex items-center justify-end gap-2"}>
                <SearchBar/>
                <NewPost/>
                <ThemeButton/>

                {isAuthenticated ? <DropdownMenu>
                    <DropdownMenuTrigger className={"rounded-full cursor-pointer"}>
                        <Avatar>
                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"}/>
                            <AvatarFallback className={"capitalize"}>{user?.full_name[0] || "A"}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <Dropdown/>
                </DropdownMenu> : <>
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
                </>}
            </div>
        </div>
    </div>);
};

export default Header;