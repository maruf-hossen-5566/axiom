import { search_data } from "@/api/searchApi.js";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Hash, Loader2, Search } from "lucide-react";
import pluralize from "pluralize";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

const SearchPage = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [open, setOpen] = useState(false);
	const [searchResult, setSearchResult] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQuery] = useDebounce(searchQuery, 300);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const search = async () => {
			setLoading(true);
			try {
				const res = await search_data({ query: searchQuery });
				setSearchResult(res?.data);
			} catch (error) {
				console.log("Failed search error: ", error);
				toast.error(
					error?.response?.data?.detail ||
						`Failed to search for "${searchQuery}".`
				);
			}
			setLoading(false);
		};

		if (searchQuery?.trim()) {
			search();
		} else {
			setSearchResult(null);
		}
	}, [debouncedQuery]);

	return <div>SearchPage</div>;
};

export default SearchPage;
