import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import useThemeStore from "@/store/themeStore.js";
import { Toaster } from "@/components/ui/sonner.jsx";
import { ScrollRestoration } from "react-router-dom";

const BaseLayout = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	useLayoutEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		}
	}, []);

	return (
		<div className={"bg-background min-h-screen"}>
			<Outlet />
			<Toaster
				position="bottom-right"
				closeButton={true}
				richColors={true}
			/>
			<ScrollRestoration />
		</div>
	);
};

export default BaseLayout;
