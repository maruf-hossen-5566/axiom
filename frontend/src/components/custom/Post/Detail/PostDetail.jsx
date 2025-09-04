import { getPostDetail } from "@/api/postApi.js";
import Title from "@/components/custom/Post/Detail/Title.jsx";
import { usePostStore } from "@/store/postStore.js";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BackButton from "../New/BackButton";
import Author from "./Author";
import { Content } from "./Content";
import Engagement from "./Engagement";
import MoreFromAuthor from "./MoreFromAuthor";
import MoreToRead from "./MoreToRead";
import PostTags from "./PostTags";
import Thumbnail from "./Thumbnail";
import UnpublishedAlert from "./UnpublishedAlert";

const PostDetail = () => {
	const { author, slug } = useParams();
	const post = usePostStore((state) => state?.post);
	const setPost = usePostStore((state) => state?.setPost);
	const clearPostStore = usePostStore((state) => state?.clearPostStore);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPostDetail = async () => {
			try {
				clearPostStore();
				const res = await getPostDetail(author, slug);
				setPost(res?.data?.post);
			} catch (error) {
				navigate("/");
				console.error("Detail error: ", error);
				toast.error(
					error?.response?.data?.detail ||
						"Failed to fetch post detail."
				);
			}
		};
		fetchPostDetail();
	}, [author, slug]);

	return (
		<div className={"min-h-screen w-full mx-auto"}>
			<>
				<div className="max-w-screen-md w-full mx-auto pt-12 pb-4 px-6 xs:px-10">
					<BackButton
						title="Home"
						to="/"
						loading={!post}
					/>
				</div>

				<UnpublishedAlert />

				<Thumbnail />
				<div className="max-w-screen-md w-full mx-auto px-6 xs:px-12 divide-y divide-accent">
					<Author />
					<Title />
					<Content />
				</div>
				{post && (
					<div
						className={
							"max-w-screen-md w-full sm:px-12 mx-auto sticky bottom-0 z-50"
						}>
						<Engagement />
					</div>
				)}
				<div className="max-w-screen-md w-full mx-auto px-6 xs:px-12">
					<PostTags />
				</div>
				<MoreFromAuthor />
				<MoreToRead />
				<div className={"w-full py-4"}></div>
			</>
		</div>
	);
};

export default PostDetail;
