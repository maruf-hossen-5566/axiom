import { useEffect, useState } from "react";
import { getTags } from "@/api/tagApi.js";
import TagCard from "@/components/custom/Tag/TagCard.jsx";
import PaginationComp from "@/components/custom/Dashboard/Pagination/Pagination.jsx";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Tags = () => {
	const [tags, setTags] = useState(null);
	const [loading, setLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");

	useEffect(() => {
		const fetchTags = async () => {
			setLoading(true);
			try {
				const res = await getTags({ page: page });
				setTags(res?.data);
			} catch (error) {
				console.log("error", error);
			}
			setLoading(false);
		};
		fetchTags();
	}, [page]);

	return (
		<div className="w-full pb-16 px-6 md:px-12">
			<div className="max-w-screen-xl w-full mt-16 mx-auto flex flex-col items-start justify-center">
				{/* Heading and description */}
				<div className="w-full mb-12 flex flex-col items-start justify-center gap-2">
					<h1 className="text-3xl font-semibold">Tags</h1>
					<p className="text-sm text-muted-foreground">
						Discover and explore tags
					</p>
				</div>

				<div className="w-full mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start justify-center">
					{loading ? (
						<div className="w-full col-span-full flex items-center justify-center py-64 px-4 border rounded-md">
							<Loader2 className="size-10 animate-spin" />
						</div>
					) : tags?.results?.length > 0 ? (
						tags?.results?.map((tag) => (
							<TagCard
								key={tag?.id}
								tag={tag}
							/>
						))
					) : (
						<div className="w-full col-span-full flex items-center justify-center py-64 px-4 border rounded-md">
							<p className="text-center">No results found</p>
						</div>
					)}
				</div>

				{tags?.results?.length > 0 && <PaginationComp data={tags} />}
			</div>
		</div>
	);
};

export default Tags;
