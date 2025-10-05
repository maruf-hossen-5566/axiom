import { getPosts } from "@/api/postApi.js";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { FeaturedPostSkeleton } from "@/components/custom/Skeleton/FeaturedPostSkeleton";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.jsx";
import { useFeedStore } from "@/store/feedStore.js";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TableKit } from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import { Placeholder, Selection } from "@tiptap/extensions";
import { generateHTML } from "@tiptap/html";
import { StarterKit } from "@tiptap/starter-kit";
import moment from "moment/moment.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

const FeaturedPost = () => {
	const setFeatured = useFeedStore((state) => state?.setFeatured);
	const featured = useFeedStore((state) => state?.featured);
	const [content, setContent] = useState("");
	const posts = useFeedStore((state) => state?.posts);
	const setPosts = useFeedStore((state) => state?.setPosts);

	useEffect(() => {
		const fetchFeaturedPosts = async () => {
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
		fetchFeaturedPosts();
	}, []);

	useEffect(() => {
		if (posts && posts?.length > 0) {
			setFeatured(posts[0]);
		}
	}, [posts]);

	useEffect(() => {
		if (featured) {
			const html = generateHTML(
				JSON.parse(featured?.content),
				extensions
			);
			setContent(html);
		}
	}, [featured]);

	return !featured ? (
		<div className="w-full">
			<FeaturedPostSkeleton />
		</div>
	) : (
		<div className="w-full block mx-auto">
			<Card className="w-full h-full max-w-screen-xl mb-16 mx-auto grid grid-cols-7 items-start justify-center bg-sidebar dark:bg-card gap-0">
				<CardHeader className={"col-span-3"}>
					<Link
						to={`/${featured?.author?.username}/${featured?.slug}`}
						className="aspect-video w-full">
						<img
							loading="lazy"
							src={
								featured?.thumbnail?.image ||
								"https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt="Photo by Drew Beamer"
							className="rounded-sm w-full h-full object-cover"
						/>
					</Link>
				</CardHeader>

				<CardContent className={"col-span-4 self-center"}>
					<div className="w-full pb-1.5 text-[13px] flex text-muted-foreground items-center justify-start">
						<p>
							{moment(featured?.created_at).format("MMM D, YYYY")}
						</p>
						<p
							className={
								"size-[5px] bg-accent rounded-full mx-2"
							}></p>
						<p>5 min read</p>
					</div>
					<Link
						to={`/${featured?.author?.username}/${featured?.slug}`}
						className="w-full">
						<CardTitle
							className={
								"capitalize mt-1 text-xl font-normal font-inter line-clamp-2"
							}>
							{featured?.title}
						</CardTitle>
						<CardDescription
							className={"mt-1.5 text-sm font-inter line-clamp-3"}
							dangerouslySetInnerHTML={{
								__html: content,
							}}></CardDescription>
					</Link>
					<Link
						to={`${featured?.author?.username}`}
						className="w-max mt-4 flex items-center gap-2">
						<Avatar className={"size-5"}>
							<AvatarImage
								src={
									featured?.author?.avatar ||
									"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								}
								alt="@evilrabbit"
							/>
							<AvatarFallback>
								{featured?.author?.full_name[0] || "A"}
							</AvatarFallback>
						</Avatar>
						<p
							className={
								"text-sm font-normal hover:underline"
							}>{`${featured?.author?.full_name}`}</p>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
};

export default FeaturedPost;
