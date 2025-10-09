import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";

const MySidebar = ({ label = "Posts", menuItems }) => {
	const location = useLocation();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup className="px-0">
					<SidebarGroupLabel className="px-4 rounded-none">
						{label}
					</SidebarGroupLabel>
					<SidebarGroupContent className="px-2 py-2">
						<SidebarMenu>
							{menuItems?.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										className="h-9 px-2.5">
										<Link
											to={item.url}
											className={
												location?.pathname
													?.split("/")
													.at(-1) ===
													(item?.url?.split("/")[1] ||
														item?.url) &&
												"bg-accent"
											}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<Button
					asCHild
					variant="outline"
					className="mt-auto mx-4 mb-4 rounded-full">
					<Link
						to={"/"}
						className="w-full">
						Back to home
					</Link>
				</Button>
			</SidebarContent>
		</Sidebar>
	);
};

export default MySidebar;
