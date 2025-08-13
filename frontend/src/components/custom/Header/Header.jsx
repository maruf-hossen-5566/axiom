import Logo from "@/components/custom/Header/Logo.jsx";
import ThemeButton from "@/components/custom/Header/ThemeButton.jsx";
import SearchBar from "@/components/custom/Header/SearchBar.jsx";
import useUserStore from "@/store/userStore.js";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import Dropdown from "@/components/custom/Header/Dropdown.jsx";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import NewPostButton from "@/components/custom/Header/NewPostButton.jsx";
import AuthButtons from "@/components/custom/Header/AuthButtons.jsx";
import NotificationButton from "@/components/custom/Header/NotificationButton.jsx";

const Header = () => {
	const user = useUserStore((state) => state.user);
	const isAuthenticated = useUserStore((state) => state.isAuthenticated);

	return (
		<div
			className={
				"w-full sticky top-0 z-[100] bg-white dark:bg-background border-b py-5"
			}>
			<div
				className={
					"w-full mx-auto flex items-center justify-between px-6"
				}>
				<Logo />

				<div className={"flex items-center justify-end gap-2"}>
					<SearchBar />

					<div className={"flex items-center justify-end gap-2"}>
						{!!isAuthenticated && (
							<>
								<NewPostButton />
							</>
						)}
						<ThemeButton />
					</div>

					<div className={"flex items-center justify-end gap-2"}>
						{isAuthenticated ? (
							<>
								<NotificationButton />
								<DropdownMenu>
									<DropdownMenuTrigger
										className={
											"rounded-full cursor-pointer"
										}>
										<Avatar>
											<AvatarImage
												src={
													user?.avatar ||
													"https://github.com/shadcn.png"
												}
											/>
											<AvatarFallback
												className={"capitalize"}>
												{user?.full_name[0] || "A"}
											</AvatarFallback>
										</Avatar>
									</DropdownMenuTrigger>
									<Dropdown />
								</DropdownMenu>
							</>
						) : (
							<AuthButtons />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
