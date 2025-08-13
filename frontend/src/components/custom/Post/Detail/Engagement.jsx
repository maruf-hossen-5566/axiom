import { Button } from "@/components/ui/Button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bookmark, Ellipsis, Heart, MessageCircle, Share } from "lucide-react";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { usePostStore } from "@/store/postStore.js";
import useUserStore from "@/store/userStore.js";
import { toast } from "sonner";
import { likePost } from "@/api/postApi";
import { checkLiked } from "@/api/postApi";
import { deletePost } from "../../../../api/postApi";
import { useNavigate } from "react-router-dom";

const Engagement = () => {
	const user = useUserStore((state) => state?.user);
	const [bookmarked, setBookmarked] = useState(false);
	const comments = usePostStore((state) => state?.comments);
	const post = usePostStore((state) => state?.post);
	const isLiked = usePostStore((state) => state?.isLiked);
	const setIsLiked = usePostStore((state) => state?.setIsLiked);
	const likeCount = usePostStore((state) => state?.likeCount);
	const commentCount = usePostStore((state) => state?.commentCount);
	const setLikeCount = usePostStore((state) => state?.setLikeCount);
	const clearPostStore = usePostStore((state) => state?.clearPostStore);
	const navigate = useNavigate();

	const handleLike = async () => {
		try {
			const res = await likePost({ post_id: post?.id });
			setIsLiked(res?.data?.is_liked);
			setLikeCount(res?.data?.like_count);
		} catch (error) {
			console.error("Like Error: ", error);
			toast.error(
				error?.response?.data?.detail || "Failed to like post."
			);
		}
	};

	const handleShare = () => {
		if (navigator && navigator.clipboard) {
			const url = window.location.href;
			navigator?.clipboard?.writeText(url);
			toast.success("URL copied to clipboard.");
		} else {
			toast.error("Navigator api is not available.");
		}
	};

	const handleDelete = async () => {
		if (!confirm("Do you really want to delete this post?")) {
			return;
		}

		toast.promise(deletePost({ post_id: post?.id }), {
			loading: "Loading...",
			success: (res) => {
				navigate("/");
				setTimeout(() => {
					clearPostStore();
				}, 1000);
				return "Post deleted successfully.";
			},
			error: (error) => {
				console.error("Post Delete Error: ", error);
				return error?.response?.data?.detail || "Failed to delete post";
			},
		});
	};

	return (
		<>
			<div className="bg-background block w-full border-t py-4 ">
				<div className="flex items-center justify-between sm:justify-start gap-2 ">
					<Button
						variant="ghost"
						className="text-xs rounded-full "
						onClick={handleLike}>
						<>
							<Heart fill={isLiked ? "currentColor" : "none"} />
							{likeCount && likeCount > 0 ? (
								likeCount
							) : (
								<span className="max-sm:hidden">Like</span>
							)}
						</>
					</Button>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								className={`text-xs rounded-full  ${
									comments &&
									!comments?.length > 0 &&
									" max-sm:size-9"
								}`}>
								<>
									<MessageCircle />
									{commentCount > 0 ? (
										commentCount
									) : (
										<span className="max-sm:hidden">
											Comment
										</span>
									)}
								</>
							</Button>
						</SheetTrigger>
						<Comments />
					</Sheet>
					<Button
						variant="ghost"
						className="text-xs max-sm:size-9 sm:ml-auto rounded-full "
						onClick={() => setBookmarked(!bookmarked)}>
						<>
							<Bookmark
								fill={bookmarked ? "currentColor" : "none"}
							/>
							<span className="max-sm:hidden">
								{bookmarked ? "Bookmarked" : "Bookmark"}
							</span>
						</>
					</Button>
					<Button
						variant="ghost"
						className="text-xs max-sm:size-9 rounded-full "
						onClick={handleShare}>
						<>
							<Share />
							<span className="max-sm:hidden">Share</span>
						</>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								size="icon"
								variant="ghost"
								className="text-xs rounded-full ">
								<Ellipsis />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-56 z-[100]"
							align="end">
							{user && user?.id === post?.author?.id ? (
								<>
									<DropdownMenuItem>Edit</DropdownMenuItem>
									<DropdownMenuItem
										variant="destructive"
										onClick={handleDelete}>
										Delete
									</DropdownMenuItem>
								</>
							) : (
								<>
									<DropdownMenuItem
										variant="destructive"
										onClick={() =>
											alert(
												"It's just for demonstration purpose."
											)
										}>
										Report
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</>
	);
};

export default Engagement;
