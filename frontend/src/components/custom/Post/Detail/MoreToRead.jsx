import { SinglePostSkeleton } from "@/components/custom/Skeleton/SinglePostSkeleton";
import SinglePost from "@/components/custom/Post/Single/SinglePost";
import { useEffect, useState } from "react";
import { moreToRead } from "@/api/postApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { usePostStore } from "@/store/postStore.js";

const MoreToRead = () => {
	const [posts, setPosts] = useState([]);
	const post = usePostStore((state) => state?.post);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await moreToRead({
					post_id: post?.id,
					author_id: post?.author?.id,
				});
				setPosts(res.data && res?.data?.slice(0, 6));
			} catch (error) {
				console.error("More to read error: ", error);
				toast.error(
					error?.response?.data?.detail || "Failed to fetch posts."
				);
			}
		};
		if (post) {
			fetchPosts();
		}
	}, [post]);

	return (
		<>
			{posts.length > 0 && (
				<div className="w-full border-t">
					<div className="w-full max-w-screen-md mx-auto my-16">
						<div className="text-xl font-medium mb-8 mx-6 xs:mx-12">
							Recommended for you
						</div>
						<div className="w-full grid grid-cols-1 sm:grid-cols-2 xs:px-6">
							{posts?.map((post) => (
								<SinglePost
									post={post}
									key={post?.id}
								/>
							))}
						</div>
						<div className="w-full px-6 xs:px-12 mt-12">
							<Button
								asChild
								variant="outline"
								className="rounded-full">
								<Link to="/">More recommendations</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MoreToRead;
