import { Button } from "@/components/ui/button.jsx";
import { Moon, Sun } from "lucide-react";
import useThemeStore from "@/store/themeStore.js";

const ThemeButton = ({ className }) => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const setIsDarkMode = useThemeStore((state) => state.setIsDarkMode);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<Button
			size={"icon"}
			variant={"ghost"}
			className={"max-sm:hidden cursor-pointer rounded-full duration-0"}
			onClick={toggleTheme}>
			{isDarkMode ? (
				<Sun className={"pointer-events-none"} />
			) : (
				<Moon className={"pointer-events-none"} />
			)}
		</Button>
	);
};

export default ThemeButton;
