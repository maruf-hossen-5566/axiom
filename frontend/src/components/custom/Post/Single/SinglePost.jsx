import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.jsx";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import moment from "moment/moment.js";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
	return (
		<Link to={`${post?.author?.username}/${post?.slug}`} className="h-full">
			<Card
				className={
					"w-full h-full col-span-1 bg-transparent hover:bg-accent dark:hover:bg-card border-none gap-0 shadow-none cursor-pointer"
				}>
				<CardHeader>
					<div className="aspect-video w-full mb-2">
						<img
							loading="lazy"
							src={
								post?.thumbnail?.image ||
								"https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt="Photo by Drew Beamer"
							className="rounded-sm w-full h-full object-cover"
						/>
					</div>
					<div className="w-full py-1 text-[13px] flex text-muted-foreground items-center justify-start">
						<p>
							{moment(post?.published_at).format("MMM D, YYYY")}
						</p>
						<p
							className={
								"size-[5px] bg-accent rounded-full mx-2"
							}></p>
						<p>5 min read</p>
					</div>
				</CardHeader>

				<CardContent>
					<div className="w-full">
						<CardTitle
							className={
								"capitalize mt-1 text-lg font-normal font-inter line-clamp-3"
							}>
							{post?.title}
						</CardTitle>
					</div>
					<div className="mt-4 flex items-center gap-2">
						<Avatar className={"size-5"}>
							<AvatarImage
								src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt={`@${post?.author?.username}`}
							/>
							<AvatarFallback>ER</AvatarFallback>
						</Avatar>
						<p
							className={
								"text-sm font-normal hover:underline"
							}>{`${post?.author?.full_name || "No Name"}`}</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default SinglePost;
