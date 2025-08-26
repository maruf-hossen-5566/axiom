import { useEffect, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import useThemeStore from "@/store/themeStore.js";
import { Toaster } from "@/components/ui/sonner.jsx";
import { ScrollRestoration } from "react-router-dom";

const BaseLayout = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	useEffect(() => {
		window.addEventListener("storage", (e) => {
			if (e.key === "reloadTab" && e.newValue) {
				window.location.reload();
				localStorage.removeItem("reloadTab");
			}
		});
	}, []);

	useLayoutEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	return (
		<div className={"bg-background min-h-screen"}>
			<Outlet />
			<Toaster
				position="bottom-right"
				closeButton={true}
				// richColors={true}
			/>
			<ScrollRestoration />
		</div>
	);
};

export default BaseLayout;
