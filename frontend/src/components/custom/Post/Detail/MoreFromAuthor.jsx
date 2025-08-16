import SinglePost from "@/components/custom/Post/Single/SinglePost";
import { useEffect, useState } from "react";
import { moreFromAuthor } from "@/api/postApi";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { usePostStore } from "@/store/postStore";
import { toast } from "sonner";
import NoContent from "./NoContent";

const MoreFromAuthor = () => {
	const [posts, setPosts] = useState([]);
	const post = usePostStore((state) => state?.post);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await moreFromAuthor({
					post_id: post?.id,
					author_id: post?.author?.id,
				});
				setPosts(res.data && res?.data?.slice(0, 4));
			} catch (error) {
				console.error("More from author error: ", error);
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
							More from{" "}
							<span className="capitalize">
								{post?.author?.full_name}
							</span>
						</div>
						<div className="w-full grid grid-cols-1 sm:grid-cols-2 xs:px-6">
							{posts.length <= 0 ? (
								<NoContent />
							) : (
								<>
									{posts?.map((post) => (
										<SinglePost
											post={post}
											key={post?.id}
										/>
									))}
								</>
							)}
						</div>
						<div className="w-full px-6 xs:px-12 mt-12">
							<Button
								asChild
								variant="outline"
								className="rounded-full">
								<Link to={`/${post?.author?.username}`}>
									See more from{" "}
									<span className="capitalize">
										{post?.author?.full_name}
									</span>
								</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MoreFromAuthor;
