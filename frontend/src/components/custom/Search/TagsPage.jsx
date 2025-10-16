import { searchTags } from "@/api/searchApi.js";
import PaginationComp from "@/components/custom/Dashboard/Pagination/Pagination";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import TagCard from "./TagCard";

const TagsPage = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [open, setOpen] = useState(false);
	const [searchResult, setSearchResult] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get("query");
	const sortBy = searchParams.get("sort");
	const page = searchParams.get("page");
	const [debouncedQuery] = useDebounce(searchQuery, 300);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const search = async () => {
			setLoading(true);
			try {
				const res = await searchTags({
					query: searchQuery?.trim(),
					page: page,
				});
				setSearchResult(res?.data);
			} catch (error) {
				toast.error(
					error?.response?.data?.detail ||
						`Failed to search for "${searchQuery}".`
				);
			}
			setLoading(false);
		};

		if (searchQuery?.trim()) {
			search();
		}
	}, [debouncedQuery, sortBy, page]);

	const handleParamChange = (key, value) => {
		setSearchParams((prev) => {
			prev?.set(key, value);
			return prev;
		});
	};

	return (
		<>
			<div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 items-start justify-center gap-6">
				{loading ? (
					<div className="col-span-full w-full h-[50rem] pt-32 flex items-start justify-center">
						<Loader2 className="animate-spin size-12" />
					</div>
				) : searchResult?.results && searchResult.results.length > 0 ? (
					searchResult.results.map((tag) => (
						<TagCard
							tag={tag}
							key={tag?.id}
						/>
					))
				) : (
					<div className="col-span-full w-full py-44 border rounded-md">
						<p className="text-center">No results found</p>
					</div>
				)}
			</div>
			<PaginationComp
				data={searchResult}
				setPageNumber={(v) => handleParamChange("page", v)}
			/>
		</>
	);
};

export default TagsPage;
