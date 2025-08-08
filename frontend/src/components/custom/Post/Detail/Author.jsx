import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment/moment.js";

const Author = ({ post }) => {
	return (
		<div className="max-w-screen-md w-full mx-auto pt-8 lg:pt-10 border-none">
			<div className="w-full flex items-center justify-start gap-2 hover:cursor-pointer ">
				<div className="flex items-center justify-start gap-2 group">
					<Avatar>
						<AvatarImage
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt={`@${post?.author?.username}`}
						/>
						<AvatarFallback>
							{post?.author?.full_name[0].toUpperCase() || "A"}
						</AvatarFallback>
					</Avatar>
					<div className="">
						<p
							className={
								"text-sm group-hover:underline font-semibold"
							}>{`${post?.author?.full_name || "No Name"}`}</p>
						<p
							className={
								"text-xs group-hover:underline text-muted-foreground hover:underline"
							}>
							@{`${post?.author?.username || "No Username"}`}
						</p>
					</div>
				</div>
				<Button
					variant="outline"
					className="ml-3 text-xs rounded-full cursor-pointer"
					onClick={() => setBookmarked(!bookmarked)}>
					Follow
				</Button>
				<p className={"ml-4 text-xs text-muted-foreground"}>
					{`${moment(post?.published).format("MMM D, YYYY")}`}
				</p>
				<div className="size-1 mx-1.5 bg-accent rounded-full"></div>
				<p className={"text-xs text-muted-foreground"}>5 min read</p>
			</div>
		</div>
	);
};

export default Author;
