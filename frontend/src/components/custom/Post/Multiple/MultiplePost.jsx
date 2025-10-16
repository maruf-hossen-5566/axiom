import { SinglePostSkeleton } from "@/components/custom/Skeleton/SinglePostSkeleton";
import { useEffect, useState } from "react";
import SinglePost from "@/components/custom/Post/Single/SinglePost.jsx";
import { toast } from "sonner";
import { getPosts } from "@/api/postApi.js";
import { useFeedStore } from "@/store/feedStore.js";
import PaginationComp from "@/components/custom/Dashboard/Pagination/Pagination.jsx";
import { useSearchParams } from "react-router-dom";

const MultiplePost = () => {
	const setPosts = useFeedStore((state) => state?.setPosts);
	const posts = useFeedStore((state) => state?.posts);
	const clearFeedStore = useFeedStore((state) => state?.clearFeedStore);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await getPosts({ page: page });
				setPosts(res?.data);
			} catch (error) {
				console.log("error", error);

				toast.error(
					error?.response?.data?.detail || "Failed to fetch posts."
				);
			}
		};
		fetchPosts();
	}, [page]);

	return (
		<div className="max-w-screen-xl w-full mt-16 mx-auto flex flex-col items-start justify-center">
			<div className="w-full mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start justify-center">
				{!posts
					? [...Array(12)].map((_, i) => (
							<SinglePostSkeleton key={i} />
					  ))
					: posts?.results?.map((post) => (
							<SinglePost
								post={post}
								key={post?.id}
							/>
					  ))}
			</div>

			<PaginationComp
				data={posts}
				setPageNumber={(v) => setSearchParams({ page: v })}
			/>
		</div>
	);
};

export default MultiplePost;
