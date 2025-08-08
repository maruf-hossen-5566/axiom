import SinglePost from "@/components/custom/Post/Single/SinglePost";
import { useEffect, useState } from "react";
import { getPosts } from "@/api/postApi";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

const MoreFromAuthor = ({ post }) => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await getPosts();
				setPosts(res?.data?.posts.slice(0, 4));
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
		<>
			<div className="w-full max-w-screen-md mx-auto my-16">
				<div className="text-xl font-medium mb-8 mx-12">
					More from{" "}
					<span className="capitalize">
						{post?.author?.full_name}
					</span>
				</div>
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 xs:px-6">
					{posts?.map((post) => (
						<SinglePost post={post} key={post?.id} />
					))}
					<Button
						asChild
						variant="outline"
						className="w-max ml-5 mt-12 rounded-full">
						<Link to="/">
							See more from{" "}
							<span className="capitalize">
								{post?.author?.full_name}
							</span>
						</Link>
					</Button>
				</div>
			</div>
		</>
	);
};

export default MoreFromAuthor;
