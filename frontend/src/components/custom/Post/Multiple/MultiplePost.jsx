import { useEffect } from "react";
import SinglePost from "@/components/custom/Post/Single/SinglePost.jsx";
import { toast } from "sonner";
import { getPosts } from "@/api/postApi.js";
import { useFeedStore } from "@/store/feedStore.js";

const MultiplePost = () => {
	const setPosts = useFeedStore((state) => state?.setPosts);
	const posts = useFeedStore((state) => state?.posts);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await getPosts();
				setPosts(res?.data?.posts);
			} catch (error) {
				console.error("Post fetch error: ", error);
				toast.error(
					error?.response?.data?.detail || "Failed to fetch posts."
				);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div
			className={
				"max-w-screen-xl w-full mt-16 mx-auto grid grid-cols-3 gap-y-6 gap-x-4 items-start justify-center"
			}>
			{posts?.map((post) => (
				<SinglePost
					post={post}
					key={post?.id}
				/>
			))}
		</div>
	);
};

export default MultiplePost;
