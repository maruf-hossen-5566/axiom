import { deleteComment, updateComment } from "@/api/commentApi";
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
import { Ellipsis } from "lucide-react";
import moment from "moment";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const SingleComment = ({ comment }) => {
	const user = useUserStore((state) => state?.user);
	const post = usePostStore((state) => state?.post);
	const comments = usePostStore((state) => state?.comments);
	const setComments = usePostStore((state) => state?.setComments);
	const commentCount = usePostStore((state) => state?.commentCount);
	const setCommentCount = usePostStore((state) => state?.setCommentCount);
	const [updatingComment, setUpdatingComment] = useState(false);
	const [updateCommentText, setUpdateCommentText] = useState(
		comment?.content
	);
	const [loading, setLoading] = useState(false);
	const updateCommentInputRef = useRef(null);

	const handleDelete = async () => {
		if (!confirm("Do you really want to delete this comment?")) {
			return;
		}

		try {
			const id = comment?.id;
			await deleteComment({ id: id });
			const filteredComments = comments?.filter(
				(comment) => comment?.id !== id
			);
			setComments(filteredComments);
			setCommentCount(commentCount - 1);
		} catch (error) {
			toast.error(
				error?.response?.data?.detail || "Failed to delete comment."
			);
		}
	};

	const handleUpdate = async (e) => {
		setLoading(true);
		try {
			const data = {
				...comment,
				content: updateCommentText,
			};

			const res = await updateComment(data);
			const targetId = comment?.id;
			const updatedComments = comments?.map((comment) =>
				comment?.id === targetId ? { ...res?.data } : comment
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

	return (
		<>
			<div className="w-full py-8 flex items-start gap-2">
				<Avatar className="size-6">
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt={
							(comment && comment?.author?.username) ||
							"Anonymous"
						}
					/>
					<AvatarFallback>
						{(comment &&
							comment?.author?.full_name[0].toUpperCase()) ||
							"A"}
					</AvatarFallback>
				</Avatar>
				{updatingComment ? (
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
				) : (
					<div className="w-full">
						<div className="w-full flex items-start justify-between gap-4">
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
					</div>
				)}
			</div>
		</>
	);
};
