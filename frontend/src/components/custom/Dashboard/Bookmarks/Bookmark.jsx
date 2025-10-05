import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkMinus, BookmarkX } from "lucide-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboardStore";
import useUserStore from "@/store/userStore";
import { bookmarkPost } from "@/api/postApi";
import { toast } from "sonner";

const Bookmark = ({ bookmark }) => {
	const setBookmarks = useDashboardStore((state) => state?.setBookmarks);
	const bookmarks = useDashboardStore((state) => state?.bookmarks);
	const setBookmarkedIds = useUserStore((state) => state?.setBookmarkedIds);

	const handleBookmarkRemoval = async () => {
		try {
			const res = await bookmarkPost({ post_id: bookmark?.id });
			setBookmarkedIds(res?.data?.bookmarked_ids);
			toast.info(res?.data?.detail || "Bookmark saved/removed.");

			const newBookmarks = bookmarks?.results?.filter(
				(b) => bookmark?.id !== b?.id
			);
			setBookmarks({ ...bookmarks, results: newBookmarks });
		} catch (error) {
			toast.error(error?.response?.data?.detail || "Failed to bookmark.");
		}
	};

	return (
		<Card
			className={
				"w-full h-full col-span-1 bg-sidebar dark:bg-card gap-0"
			}>
			<CardHeader>
				<Link
					to={`/${bookmark?.author?.username}/${bookmark?.slug}`}
					className="aspect-video w-full mb-2">
					<img
						loading="lazy"
						src={
							bookmark?.thumbnail?.image ||
							"https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
						alt="Photo by Drew Beamer"
						className="rounded-sm w-full h-full object-cover"
					/>
				</Link>
				<div className="w-full py-1 text-[13px] flex text-muted-foreground items-center justify-start">
					<p>{moment(bookmark?.created_at).format("MMM D, YYYY")}</p>
					<p className={"size-[5px] bg-accent rounded-full mx-2"}></p>
					<p>5 min read</p>
				</div>
			</CardHeader>

			<CardContent>
				<Link
					to={`/${bookmark?.author?.username}/${bookmark?.slug}`}
					className="w-full">
					<CardTitle
						className={
							"capitalize mt-1 text-lg font-normal font-inter line-clamp-3"
						}>
						{bookmark?.title}
					</CardTitle>
				</Link>
				<Link
					to={`/${bookmark?.author?.username}`}
					className="w-max mt-4 flex items-center gap-2">
					<Avatar className={"size-5"}>
						<AvatarImage
							src={
								bookmark?.author?.avatar ||
								"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt={`@${bookmark?.author?.username}`}
						/>
						<AvatarFallback>ER</AvatarFallback>
					</Avatar>
					<p className={"text-sm font-normal hover:underline"}>{`${
						bookmark?.author?.full_name || "No Name"
					}`}</p>
				</Link>
			</CardContent>
			<div className="w-full mt-auto px-6 flex items-center justify-end gap-2">
				<Button
					variant="outline"
					size="icon"
					className="rounded-full"
					onClick={handleBookmarkRemoval}>
					<BookmarkMinus />
				</Button>
			</div>
		</Card>
	);
};

export default Bookmark;
