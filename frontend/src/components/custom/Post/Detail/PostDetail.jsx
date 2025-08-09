import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getPostDetail } from "@/api/postApi.js";
import { generateHTML } from "@tiptap/html";
import { StarterKit } from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import { TableKit } from "@tiptap/extension-table";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Placeholder, Selection } from "@tiptap/extensions";
import { usePostStore } from "@/store/postStore.js";
import Title from "@/components/custom/Post/Detail/Title.jsx";
import Thumbnail from "./Thumbnail";
import Author from "./Author";
import Engagement from "./Engagement";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import PostTags from "./PostTags";
import MoreFromAuthor from "./MoreFromAuthor";
import MoreToRead from "./MoreToRead";

const extensions = [
	StarterKit,
	TextAlign,
	TaskList,
	TaskItem,
	Highlight,
	Image,
	Typography,
	Superscript,
	Subscript,
	Selection,
	ImageUploadNode,
	Placeholder,
	Youtube,
	TableKit,
];

const PostDetail = () => {
	const { author, slug } = useParams();
	const [content, setContent] = useState("");
	const post = usePostStore((state) => state?.post);
	const setPost = usePostStore((state) => state?.setPost);

	useEffect(() => {
		const fetchPostDetail = async () => {
			try {
				const res = await getPostDetail(author, slug);
				setPost(res?.data);
			} catch (error) {
				toast.error(
					error?.response?.data?.detail ||
						"Failed to fetch post detail."
				);
			}
		};
		fetchPostDetail();
	}, [author, slug]);

	useEffect(() => {
		if (post) {
			const html = generateHTML(JSON.parse(post?.content), extensions);
			setContent(html);
		}
	}, [post, post?.content]);

	// console.log("Post Detail: ", post);

	return (
		<div className={"min-h-screen w-full mx-auto"}>
			{!post ? (
				"loading..."
			) : (
				<>
					{/* <div className="max-w-screen-md w-full mx-auto pt-12 pb-4 px-6 lg:px-8"> */}
					<div className="max-w-screen-md w-full mx-auto pt-12 pb-4 px-6 xs:px-8">
						<Button
							asChild
							variant="ghost"
							className="rounded-full">
							<Link
								to={"/"}
								className="text-xs text-muted-foreground ">
								<ArrowLeft /> Back
							</Link>
						</Button>
					</div>
					<Thumbnail thumbnail={post?.thumbnail} />
					<div
						className={
							// "max-w-screen-md w-full pb-24 mx-auto px-6 xs:px-12 divide-y divide-accent"
							"max-w-screen-md w-full mx-auto px-6 xs:px-12 divide-y divide-accent"
						}>
						<Author post={post} />
						<Title title={post?.title} />
						<div
							className="max-w-screen-md w-full pb-16 prose dark:prose-invert"
							dangerouslySetInnerHTML={{ __html: content }}></div>
						<div className={"w-full sticky bottom-0 z-50"}>
							<Engagement />
						</div>
						<div className={"w-full "}>
							<PostTags />
						</div>
					</div>
					<div className={"w-full border-t"}>
						<MoreFromAuthor post={post} />
					</div>
					<div className={"w-full border-t"}>
						<MoreToRead post={post} />
					</div>
					<div className={"w-full py-4"}></div>
				</>
			)}
		</div>
	);
};

export default PostDetail;
