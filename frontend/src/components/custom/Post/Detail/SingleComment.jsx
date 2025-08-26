import pluralize from "pluralize";
import { deleteComment, updateComment, likeComment } from "@/api/commentApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePostStore } from "@/store/postStore";
import useUserStore from "@/store/userStore";
import {
	ChevronDown,
	ChevronUp,
	Ellipsis,
	Heart,
	MessageCircle,
	Reply,
} from "lucide-react";
import moment from "moment";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const SingleComment = ({ comment }) => {
	const user = useUserStore((state) => state?.user);
	const post = usePostStore((state) => state?.post);
	const comments = usePostStore((state) => state?.comments);
	const setComments = usePostStore((state) => state?.setComments);
	const likeCount = usePostStore((state) => state?.likeCount);
	const commentCount = usePostStore((state) => state?.commentCount);
	const setCommentCount = usePostStore((state) => state?.setCommentCount);
	const [updatingComment, setUpdatingComment] = useState(false);
	const [updateCommentText, setUpdateCommentText] = useState(
		comment?.content
	);
	const [loading, setLoading] = useState(false);
	const updateCommentInputRef = useRef(null);
	const [showReplies, setShowReplies] = useState(false);

	const handleDelete = async () => {
		if (!confirm("Do you really want to delete this comment?")) {
			return;
		}

		try {
			const commentId = comment?.id;
			await deleteComment({ comment_id: commentId, post_id: post?.id });
			const filteredComments = comments?.filter(
				(comment) => comment?.id !== commentId
			);
			setComments(filteredComments);
			setCommentCount(commentCount - 1);
		} catch (error) {
			toast.error(
				error?.response?.data?.detail || "Failed to delete comment."
			);
		}
	};

	const handleUpdate = async () => {
		setLoading(true);
		try {
			const data = {
				...comment,
				content: updateCommentText,
				post_id: post?.id,
			};

			const res = await updateComment(data);
			const targetId = comment?.id;
			const updatedComments = comments?.map((comment) =>
				comment?.id === targetId ? { ...res?.data?.comment } : comment
			);
			setComments(updatedComments);
			setUpdatingComment(false);
		} catch (error) {
			console.error("Error: ", error);
			toast.error(
				error?.response?.data?.detail || "Failed to update comment"
			);
		}
		setLoading(false);
	};

	const handleLike = async () => {
		try {
			const res = await likeComment({
				post_id: post?.id,
				comment_id: comment?.id,
			});
		} catch (error) {
			console.error("Like error: ", error);
			toast.error(error?.response?.data?.detail || "Failed to like.");
		}
	};

	return (
		<>
			<div className="w-full pt-5 pb-5 flex items-start gap-2">
				{!updatingComment ? (
					<div className="w-full">
						<div className="w-full flex items-start justify-between gap-4">
							<Avatar className="size-7 self-center">
								<AvatarImage
									src={
										comment?.author?.avatar ||
										"https://github.com/shadcn.png"
									}
									alt={
										(comment &&
											comment?.author?.username) ||
										"Anonymous"
									}
								/>
								<AvatarFallback>
									{(comment &&
										comment?.author?.full_name[0].toUpperCase()) ||
										"A"}
								</AvatarFallback>
							</Avatar>
							<div className="w-full flex flex-col">
								<div className="flex items-center gap-2">
									<p className="text-sm font-medium">
										{(comment &&
											comment?.author?.full_name) ||
											"Anonymous"}
									</p>
									{comment &&
									post &&
									comment?.author?.id === user?.id ? (
										<Badge className="rounded-full">
											You
										</Badge>
									) : comment?.author?.id ===
									  post.author?.id ? (
										<Badge className="rounded-full">
											Author
										</Badge>
									) : (
										""
									)}
								</div>
								<p className="text-xs text-muted-foreground">
									{moment(
										comment && comment?.created_at
									).fromNow()}
								</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="size-6 rounded-full">
										<Ellipsis />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-56 z-[100]"
									align="end">
									{user &&
									user?.id === comment?.author?.id ? (
										<DropdownMenuGroup>
											<DropdownMenuItem
												onClick={() =>
													setUpdatingComment(true)
												}>
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												variant="destructive"
												onClick={handleDelete}>
												Delete
											</DropdownMenuItem>
										</DropdownMenuGroup>
									) : (
										<DropdownMenuGroup>
											<DropdownMenuItem
												variant="destructive"
												onClick={() =>
													alert(
														"It's just for demonstration purpose."
													)
												}>
												Report
											</DropdownMenuItem>
										</DropdownMenuGroup>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<p className="text-sm mt-2">{comment?.content}</p>

						<div className="mt-5 w-full flex items-center justify-start gap-4">
							<div className="w-max flex items-center ">
								<Button
									className="text-xs size-8 -ml-2.5 rounded-full"
									variant="ghost"
									onClick={handleLike}>
									<Heart />
								</Button>
								<span className="text-xs -ml-0.5">
									{likeCount}
								</span>
							</div>
							<Button
								className="text-xs rounded-full"
								size="sm"
								variant="ghost">
								Reply
							</Button>
							{comment?.replies?.length > 0 && (
								<div className="ml-auto flex items-center justify-center">
									<Button
										className="text-xs rounded-full"
										size="sm"
										variant="ghost"
										onClick={() =>
											setShowReplies(!showReplies)
										}>
										{commentCount}{" "}
										{pluralize("reply", commentCount)}
										{showReplies ? (
											<ChevronUp />
										) : (
											<ChevronDown />
										)}
									</Button>
								</div>
							)}
						</div>

						{showReplies && (
							<div className="w-full mt-6 flex flex-col items-center justify-center border-l-2 pl-6 divide-y">
								{comment?.replies.length > 0 &&
									comment?.replies?.map((reply) => (
										<SingleComment
											comment={reply}
											key={reply?.id}
										/>
									))}
							</div>
						)}
					</div>
				) : (
					<div className="w-full flex flex-col items-center justify-start gap-3">
						<textarea
							placeholder="Write your comment..."
							rows="5"
							className="w-full py-2 px-3 text-sm bg-input/30 border border-input outline-none rounded-sm resize-none"
							onChange={(e) =>
								setUpdateCommentText(e.target?.value)
							}
							value={updateCommentText}></textarea>
						<div className="w-full flex items-center justify-between gap-2">
							<Button
								variant="ghost"
								className="rounded-full"
								onClick={() => setUpdatingComment(false)}>
								Cancel
							</Button>
							<Button
								onClick={handleUpdate}
								className="rounded-full"
								disabled={
									loading ||
									!updateCommentText?.trim() ||
									updateCommentText?.trim() ===
										comment?.content
								}>
								Update
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
