import { Button } from "@/components/ui/button";
import axios from "axios";
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStor from "@/store/userStore";
import { SingleComment } from "./SingleComment";
import { addComment, getComments } from "@/api/commentApi";
import { toast } from "sonner";

const Comments = () => {
	const [comments, setComments] = useState(null);
	const [commentText, setCommentText] = useState("");
	const user = useUserStor((state) => state?.user);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				// const res = await axios.get("https://dummyjson.com/comments");
				const res = await getComments();
				setComments(res?.data);
			} catch (error) {
				console.error("Comment fetch error: ", error);
				toast.error(
					error?.response?.data?.detail || "Failed to fetch comments."
				);
			}
		};
		fetchComments();
	}, []);

	const handleComment = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await addComment({ comment: commentText });
			setComments((prev) => [...prev, res?.data]);
		} catch (error) {
			toast.error(
				error?.response?.data?.detail || "Failed to add comment."
			);
		}
		setLoading(false);
	};

	return (
		<>
			<SheetContent className="z-[100] overflow-y-auto pb-12">
				<SheetHeader>
					<SheetTitle>Comments</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div className="grid flex-1 auto-rows-min gap-6">
					<div className="grid gap-3 px-4">
						<div className="w-full flex items-center justify-start gap-2">
							<Avatar className="size-6">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt={user?.username || "No username"}
								/>
								<AvatarFallback>
									{user?.full_name[0].toUpperCase() ||
										"Not full_name"}
								</AvatarFallback>
							</Avatar>
							<p className="text-sm">
								{user?.full_name || "Anonymous"}
							</p>
						</div>
						<textarea
							placeholder="Write your comment..."
							rows="5"
							className="py-1 px-3 bg-input/30 border border-input outline-none rounded-sm resize-none"
							onChange={(e) => setCommentText(e.target?.value)}
							value={commentText}></textarea>
						<div className="w-full flex items-center justify-end gap-2">
							<Button
								variant="ghost"
								className="rounded-full">
								Cancel
							</Button>
							<Button
								onClick={handleComment}
								className="rounded-full">
								Comment
							</Button>
						</div>
					</div>
					<div className="w-full block border-t px-4">
						<div className="w-full divide-y ">
							{comments?.map((comment) => (
								<SingleComment
									comment={comment}
									key={comment?.id}
								/>
							))}
						</div>
					</div>
				</div>
			</SheetContent>
		</>
	);
};

export default Comments;
