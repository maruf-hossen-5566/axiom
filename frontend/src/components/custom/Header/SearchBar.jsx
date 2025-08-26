import { Input } from "@/components/ui/input.jsx";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
	return (
		<>
			<Input
				type={"text"}
				placeholder={"Search..."}
				className={"max-sm:hidden rounded-full"}
			/>
			<Button
				className="sm:hidden mr-1 rounded-full"
				size="icon"
				variant="ghost">
				<Search />
			</Button>
		</>
	);
};

export default SearchBar;
