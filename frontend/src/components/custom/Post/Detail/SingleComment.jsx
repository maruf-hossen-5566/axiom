import {
	addComment,
	deleteComment,
	likeComment,
	updateComment,
} from "@/api/commentApi";
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
import { ChevronDown, ChevronUp, Ellipsis, Heart, X } from "lucide-react";
import moment from "moment";
import pluralize from "pluralize";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AddComment from "./AddComment";
import SingleCommentSkeleton from "@/components/custom/Skeleton/SingleCommentSkeleton.jsx";

export const SingleComment = ({ comment }) => {
	const user = useUserStore((state) => state?.user);
	const post = usePostStore((state) => state?.post);
	const setPost = usePostStore((state) => state?.setPost);
	const comments = usePostStore((state) => state?.comments);
	const setComments = usePostStore((state) => state?.setComments);
	const [updatingComment, setUpdatingComment] = useState(false);
	const [updateCommentText, setUpdateCommentText] = useState(
		comment?.content
	);
	const [loading, setLoading] = useState(false);
	const [showReplies, setShowReplies] = useState(false);
	const [replyContent, setReplyContent] = useState("");
	const [replying, setReplying] = useState(false);

	const handleReply = async () => {
		setLoading(true);
		try {
			const data = {
				post: post?.id,
				parent: comment?.id,
				content: replyContent,
			};

			if (comment?.parent !== null) {
				data["parent"] = comment?.parent;
				data["to"] = comment?.author?.id;
			}

			const res = await addComment(data);

			const parent = comments?.find(
				(comment) => comment?.id === res?.data?.comment?.parent
			);
			parent["replies"] = [res?.data?.comment, ...parent.replies];
			parent["reply_count"] = res?.data?.parent_reply_count;

			const newComments = comments.map((c) =>
				c.id !== parent.id ? c : parent
			);
			setComments(newComments);
			setReplying(false);
			setReplyContent("");
			console.log("Comments after: ", comments);
		} catch (error) {
			toast.error(error?.response?.data?.detail || "Failed to reply.");
		}
		setLoading(false);
	};

	const handleDelete = async () => {
		if (!confirm("Do you really want to delete this comment?")) {
			return;
		}

		try {
			const commentId = comment?.id;
			const data = {
				comment_id: commentId,
				post_id: post?.id,
			};
			let newComments = comments?.filter(
				(comment) => comment?.id !== commentId
			);

			const res = await deleteComment(data);

			if (res.data && res.data.parent) {
				const parent = comments?.find(
					(comment) => comment?.id === res?.data?.parent
				);
				parent["replies"] = parent?.replies?.filter(
					(r) => r?.id !== commentId
				);
				parent["reply_count"] = res?.data?.parent_reply_count;

				newComments = comments.map((c) =>
					c.id === parent.id ? parent : c
				);
			}

			setComments(newComments);
			setPost({ ...post, comment_count: res?.data?.comment_count });
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

			if (comment?.to !== null) {
				data["to"] = comment?.to?.id;
			}

			const res = await updateComment(data);

			let newComments = comments?.map((c) =>
				c?.id === comment?.id ? res?.data?.comment : c
			);

			if (comment?.parent !== null) {
				const parent = comments?.find((c) => c?.id === comment?.parent);
				parent["replies"] = parent?.replies?.map((r) =>
					r?.id === res?.data?.comment?.id ? res?.data?.comment : r
				);
				newComments = comments?.map((c) =>
					c?.id === parent?.id ? parent : c
				);
			}
			setComments(newComments);
			setUpdatingComment(false);
		} catch (error) {
			toast.error(
				error?.response?.data?.detail || "Failed to update comment"
			);
		}
		setLoading(false);
	};

	const handleLike = async () => {
		setLoading(true);
		try {
			const commentId = comment?.id;
			const res = await likeComment({
				post_id: post?.id,
				comment_id: commentId,
			});

			let newComments = comments?.map((c) =>
				c?.id === res?.data?.comment?.id ? res?.data?.comment : c
			);

			if (comment?.parent !== null) {
				console.log("Parent not null");
				const parent = comments?.find((c) => c?.id === comment?.parent);
				parent["replies"] = parent?.replies?.map((r) =>
					r?.id === res?.data?.comment?.id ? res?.data?.comment : r
				);
				newComments = comments?.map((c) =>
					c?.id === parent?.id ? parent : c
				);
			}
			setComments(newComments);
		} catch (error) {
			toast.error(error?.response?.data?.detail || "Failed to like.");
		}
		setLoading(false);
	};

	return (
		<div className="w-full pt-5 pb-5 flex items-start gap-2">
			{!updatingComment ? (
				<div className="w-full">
					<div className="w-full flex items-start justify-between gap-4">
						<Link
							to={`/${comment?.author?.username}`}
							className={"size-7 shrink-0 self-center"}>
							<Avatar className="size-full">
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
						</Link>
						<div className="w-full flex flex-col">
							<div className="flex items-center gap-2">
								<p className="text-sm font-medium">
									{(comment && comment?.author?.full_name) ||
										"Anonymous"}
								</p>
								{comment &&
								post &&
								comment?.author?.id === user?.id ? (
									<Badge className="rounded-full">You</Badge>
								) : comment?.author?.id === post.author?.id ? (
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
								{user && user?.id === comment?.author?.id ? (
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

					<p className="text-sm mt-2 leading-relaxed">
						{comment && comment?.to && (
							<Link
								to={`/${comment?.to?.username}`}
								className="mr-1.5 text-blue-500 font-semibold hover:underline">
								{comment?.to?.full_name}
							</Link>
						)}
						{comment?.content}
					</p>

					<div className="mt-5 w-full flex items-center justify-start gap-4">
						<div className="w-max flex items-center ">
							<Button
								className="text-xs size-8 -ml-2.5 rounded-full"
								variant="ghost"
								onClick={handleLike}
								disabled={loading}>
								<Heart
									fill={
										comment?.is_liked
											? "currentColor"
											: "none"
									}
								/>
							</Button>
							{comment?.like_count > 0 && (
								<span className="text-xs -ml-0.5">
									{comment?.like_count}
								</span>
							)}
						</div>
						<Button
							className="text-xs rounded-full"
							size="sm"
							variant="ghost"
							onClick={() => setReplying(!replying)}>
							Reply {replying && <X />}
						</Button>

						{comment?.replies?.length > 0 && (
							<div className="ml-auto flex items-center justify-center">
								<Button
									className="text-xs rounded-full !text-blue-500 hover:!bg-blue-500/10"
									size="sm"
									variant="ghost"
									onClick={() =>
										setShowReplies(!showReplies)
									}>
									{comment?.reply_count}{" "}
									{pluralize("reply", comment?.reply_count)}
									{showReplies ? (
										<ChevronUp />
									) : (
										<ChevronDown />
									)}
								</Button>
							</div>
						)}
					</div>

					{replying && (
						<div className="w-full mt-2">
							<AddComment
								handleUpdate={handleReply}
								loading={loading}
								updateCommentText={replyContent}
								setUpdateCommentText={setReplyContent}
								setUpdatingComment={setReplying}
							/>
						</div>
					)}

					{showReplies && comment?.reply_count > 0 && (
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
				<AddComment
					handleUpdate={handleUpdate}
					loading={loading}
					setUpdateCommentText={setUpdateCommentText}
					updateCommentText={updateCommentText}
					comment={comment}
					setUpdatingComment={setUpdatingComment}
				/>
			)}
		</div>
	);
};
