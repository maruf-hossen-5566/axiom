import {
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu.jsx";
import useUserStore from "@/store/userStore.js";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {ArrowRightFromLine, Bell, Bookmark, LayoutDashboard, PenLine, Settings} from "lucide-react";
import {removeTokens} from "@/utils/token.js";
import {useEditorStore} from "@/store/editorStore.js";

const ProfileDropdown = () => {
    const user = useUserStore(state => state.user)
    const logout = useUserStore(state => state.logout)
    const clearPostStore = useEditorStore(state => state?.clearPostStore)

    const handleLogout = () => {
        if (!confirm("Do you really want to log out?")) {
            return
        }

        logout()
        removeTokens()
        clearPostStore()
    }

    return (<DropdownMenuContent
        className="w-56 z-[1000] font-inter"
        align="end"
        loop={true}
    >
        <DropdownMenuGroup>
            <DropdownMenuItem className={"w-full flex items-center justify-start gap-y-0"}>
                <Avatar>
                    <AvatarImage src={user?.image || "https://github.com/shadcn.png"}/>
                    <AvatarFallback className={"capitalize"}>{user?.full_name[0] || "A"}</AvatarFallback>
                </Avatar>
                <div className={"w-full flex flex-col items-start justify-start gap-y-0 overflow-x-hidden"}>
                    <p className={"w-full capitalize truncate text-base font-bold"}>{user && user?.full_name || "Anonymous"}</p>
                    <p className={"w-full truncate"}>@{user && user?.username || "anonymous"}</p>
                </div>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
            <DropdownMenuItem>
                <>
                    <PenLine/>
                    Create Post
                </>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <>
                    <Bookmark/>
                    Bookmarks
                </>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
            <DropdownMenuItem>
                <>
                    <LayoutDashboard/>
                    Dashboard
                </>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <>
                    <Settings/>
                    Settings
                </>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
            <DropdownMenuItem>
                <>
                    <Bell/>
                    Notifications
                </>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
            <DropdownMenuItem
                variant={"destructive"}
                onClick={handleLogout}
            >
                <>
                    <ArrowRightFromLine/>
                    Logout
                </>
            </DropdownMenuItem>
        </DropdownMenuGroup>
    </DropdownMenuContent>);
};

export default ProfileDropdown;