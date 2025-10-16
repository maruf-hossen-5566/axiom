import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar.jsx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card.jsx";
import moment from "moment/moment.js";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
	return (
		<div className="w-full block mx-auto">
			<Card className="w-full h-full max-w-screen-xl mx-auto flex flex-col lg:grid grid-cols-7 items-start justify-center bg-sidebar dark:bg-card gap-0 overflow-hidden">
				<CardHeader
					className={
						"lg:col-span-3 w-full max-md:mb-4 flex items-center justify-center"
					}>
					<Link
						to={`/${post?.author?.username}/${post?.slug}`}
						className="w-full aspect-video ">
						<img
							loading="lazy"
							src={
								post?.thumbnail?.image ||
								"https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt="Photo by Drew Beamer"
							className="rounded-sm w-full h-full object-cover"
						/>
					</Link>
				</CardHeader>

				<CardContent className="md:pl-0 col-span-4 self-center">
					<div className="w-full pb-1.5 text-[13px] flex text-muted-foreground items-center justify-start">
						<p>
							{moment(post?.created_at).format("MMM D, YYYY")}
						</p>
						<p
							className={
								"size-[5px] bg-accent rounded-full mx-2"
							}></p>
						<p>5 min read</p>
					</div>
					<Link
						to={`/${post?.author?.username}/${post?.slug}`}
						className="w-full">
						<CardTitle
							className={
								"capitalize mt-1 text-xl font-normal font-inter line-clamp-2"
							}>
							{post?.title}
						</CardTitle>
					</Link>
					<Link
						to={`${post?.author?.username}`}
						className="w-max mt-4 flex items-center gap-2">
						<Avatar className={"size-5"}>
							<AvatarImage
								src={
									post?.author?.avatar ||
									"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								}
								alt="@evilrabbit"
							/>
							<AvatarFallback>
								{post?.author?.full_name[0] || "A"}
							</AvatarFallback>
						</Avatar>
						<p
							className={
								"text-sm font-normal hover:underline"
							}>{`${post?.author?.full_name}`}</p>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
};

export default PostCard;
