import { useEffect, useState } from "react";
import { getTag } from "@/api/tagApi.js";
import PostCard from "@/components/custom/Search/PostCard.jsx";
import PaginationComp from "@/components/custom/Dashboard/Pagination/Pagination.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import TagCard from "./TagCard.jsx";
import SinglePost from "@/components/custom/Post/Single/SinglePost.jsx";

const Tag = () => {
	const { slug } = useParams();
	const [tag, setTag] = useState(null);
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");

	useEffect(() => {
		const fetchTag = async () => {
			setLoading(true);
			try {
				const res = await getTag(slug, { page: page });
				setTag(res?.data?.tag);
				setPosts(res?.data?.posts);
			} catch (error) {
				console.log("Error: ", error);
			}
			setLoading(false);
		};

		fetchTag();
	}, [page]);

	return (
		<div className="w-full pb-16 px-6 md:px-12">
			<div className="max-w-screen-xl w-full mt-16 mx-auto flex flex-col items-start justify-center">
				{/* Heading and description */}
				<div className="w-full mb-12 flex flex-col items-start justify-center gap-2">
					<TagCard tag={tag} />
				</div>

				<div className="w-full mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start justify-center">
					{loading ? (
						<div className="w-full col-span-full flex items-center justify-center py-64 px-4 border rounded-md">
							<Loader2 className="size-10 animate-spin" />
						</div>
					) : posts?.results?.length > 0 ? (
						posts?.results?.map((post) => (
							<SinglePost
								key={tag?.id}
								post={post}
							/>
						))
					) : (
						<div className="w-full col-span-full flex items-center justify-center py-64 px-4 border rounded-md">
							<p className="text-center">No results found</p>
						</div>
					)}
				</div>
				{posts?.results?.length > 0 && <PaginationComp data={posts} />}
			</div>
		</div>
	);
};

export default Tag;
