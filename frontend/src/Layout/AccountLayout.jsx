import SidebarHeader from "@/components/custom/Sidebar/SidebarHeader.jsx";
import {SidebarProvider} from "@/components/ui/sidebar.jsx";
import MySidebar from "@/components/custom/Sidebar/Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {Bell, LockKeyhole, User} from "lucide-react";

const menuItems = [
	{
		title: "Profile",
		url: "profile",
		icon: User,
	},
	{
		title: "Notification",
		url: "notification",
		icon: Bell,
	},
	{
		title: "Security",
		url: "security",
		icon: LockKeyhole,
	},
];

const AccountLayout = () => {
	return (
		<SidebarProvider>
			<MySidebar menuItems={menuItems} />

			<div className="w-full flex flex-col items-start justify-start">
				<SidebarHeader />
				<div className="max-w-screen-md px-6 mx-auto w-full flex flex-col items-start justify-start pt-16 ">
					<Outlet />
				</div>
			</div>
		</SidebarProvider>
	);
};

export default AccountLayout;
