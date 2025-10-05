import SidebarHeader from "@/components/custom/Sidebar/SidebarHeader.jsx";
import { SidebarProvider } from "@/components/ui/sidebar.jsx";
import MySidebar from "@/components/custom/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import {
	Bookmark,
	BookOpen,
	Users,
	UserCheck,
	ChartPie,
	ShieldBan,
} from "lucide-react";

const menuItems = [
	{
		title: "Posts",
		url: "/dashboard",
		icon: BookOpen,
	},
	{
		title: "Bookmarks",
		url: "bookmarks",
		icon: Bookmark,
	},
	{
		title: "Followers",
		url: "followers",
		icon: Users,
	},
	{
		title: "Following",
		url: "following",
		icon: UserCheck,
	},
	{
		title: "Analytics",
		url: "analytics",
		icon: ChartPie,
	},
	{
		title: "Blocked",
		url: "blocked",
		icon: ShieldBan,
	},
];

const DashboardLayout = () => {
	return (
		<SidebarProvider>
			<MySidebar menuItems={menuItems} />

			<div className="w-full flex flex-col items-start justify-start overflow-auto">
				<SidebarHeader />
				<div className="w-full flex flex-col items-start justify-start py-16">
					<Outlet />
				</div>
			</div>
		</SidebarProvider>
	);
};

export default DashboardLayout;
