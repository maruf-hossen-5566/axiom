import { NavLink, useLocation } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input.jsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const InputAndFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get("query");
	const location = useLocation();

	const handleParamChange = (key, value) => {
		setSearchParams((prev) => {
			prev?.set(key, value);
			return prev;
		});
	};

	return (
		<div className="w-full flex flex-col items-center justify-start gap-6 overflow-hidden">
			<div className="w-full flex items-start justify-center gap-x-8 ">
				<Input
					className="py-6 px-4 rounded-full"
					placeholder="Search..."
					value={searchQuery?.trimStart()}
					onChange={(e) => handleParamChange("query", e.target.value)}
				/>
			</div>
			<div className="w-full mx-auto -mt-2 mb-4 pt-4 pb-6 flex items-center justify-between gap-4 border-b">
				<div className="flex items-center justify-start gap-2">
					<NavLink
						to={`posts?query=${searchQuery}`}
						className={({ isActive }) =>
							cn(
								buttonVariants({
									variant:
										isActive ||
										location?.pathname === "/search"
											? "outline"
											: "ghost",
								}),
								"rounded-full"
							)
						}>
						Posts
					</NavLink>
					<NavLink
						to={`users?query=${searchQuery}`}
						className={({ isActive }) =>
							cn(
								buttonVariants({
									variant: isActive ? "outline" : "ghost",
								}),
								"rounded-full"
							)
						}>
						Users
					</NavLink>
					<NavLink
						to={`tags?query=${searchQuery}`}
						className={({ isActive }) =>
							cn(
								buttonVariants({
									variant: isActive ? "outline" : "ghost",
								}),
								"rounded-full"
							)
						}>
						Tags
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default InputAndFilter;
