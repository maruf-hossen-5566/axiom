import useThemeStore from "@/store/themeStore.js";
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu.jsx";
import useUserStore from "@/store/userStore.js";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import {
	ArrowRightFromLine,
	Bell,
	Bookmark,
	LayoutDashboard,
	Moon,
	PenLine,
	Settings,
	Sun,
} from "lucide-react";
import { removeTokens } from "@/utils/token.js";
import { useEditorStore } from "@/store/editorStore.js";
import { usePostStore } from "@/store/postStore.js";
import { Link, useNavigate } from "react-router-dom";
import ThemeButton from "./ThemeButton";

const ProfileDropdown = () => {
	const user = useUserStore((state) => state.user);
	const logout = useUserStore((state) => state.logout);
	const clearEditorStore = useEditorStore((state) => state?.clearEditorStore);
	const clearPostStore = usePostStore((state) => state?.clearPostStore);
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const setIsDarkMode = useThemeStore((state) => state.setIsDarkMode);
	const navigate = useNavigate();

	const handleLogout = () => {
		if (!confirm("Do you really want to log out?")) {
			return;
		}
		navigate("/");

		logout();

		localStorage.setItem("reloadTab", Date.now().toString());
		removeTokens();
		clearEditorStore();
	};

	return (
		<DropdownMenuContent
			className="w-56 z-[1000] font-inter"
			align="end"
			loop={true}>
			<DropdownMenuGroup>
				<DropdownMenuItem
					asChild
					className={
						"w-full flex items-center justify-start gap-y-0"
					}>
					<Link to={`/${user?.username}`}>
						<Avatar>
							<AvatarImage
								src={
									user?.avatar ||
									"https://github.com/shadcn.png"
								}
							/>
							<AvatarFallback className={"capitalize"}>
								{user?.full_name[0] || "A"}
							</AvatarFallback>
						</Avatar>
						<div
							className={
								"w-full flex flex-col items-start justify-start gap-y-0 overflow-x-hidden"
							}>
							<p
								className={
									"w-full capitalize truncate text-base font-medium"
								}>
								{(user && user?.full_name) || "Anonymous"}
							</p>
							<p
								className={
									"w-full truncate text-muted-foreground"
								}>
								@{(user && user?.username) || "anonymous"}
							</p>
						</div>
					</Link>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem asChild>
					<Link to="/new">
						<PenLine />
						Create Post
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/dashboard/bookmarks">
						<Bookmark />
						Bookmarks
					</Link>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem asChild>
					<Link to="/dashboard">
						<LayoutDashboard />
						Dashboard
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/account">
						<Settings />
						Account Settings
					</Link>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem onClick={() => setIsDarkMode(!isDarkMode)}>
					{isDarkMode ? (
						<Sun className={"pointer-events-none"} />
					) : (
						<Moon className={"pointer-events-none"} />
					)}{" "}
					Theme
				</DropdownMenuItem>
				<DropdownMenuItem>
					<>
						<Bell />
						Notifications
					</>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem
					variant="destructive"
					onClick={handleLogout}>
					<>
						<ArrowRightFromLine />
						Logout
					</>
				</DropdownMenuItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	);
};

export default ProfileDropdown;
