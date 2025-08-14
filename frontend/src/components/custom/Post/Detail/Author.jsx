import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment/moment.js";
import { usePostStore } from "@/store/postStore.js";
import { Skeleton } from "@/components/ui/skeleton";
import { follow } from "@/api/profileApi";
import { toast } from "sonner";
import useUserStore from "@/store/userStore.js";
import { Link } from "react-router-dom";

const Author = () => {
	const post = usePostStore((state) => state?.post);
	const user = useUserStore((state) => state?.user);
	const followingIds = useUserStore((state) => state?.followingIds);
	const setFollowingIds = useUserStore((state) => state?.setFollowingIds);

	const handleFollow = async () => {
		const author = post?.author;
		toast.promise(follow({ author_id: author?.id }), {
			loading: "Loading...",
			success: (res) => {
				setFollowingIds(res?.data?.following_ids);
				return res?.data?.detail || `Following "${author?.full_name}".`;
			},
			error: (error) => {
				console.error("Follow error: ", error);
				return error?.response?.data?.detail || "Failed to follow.";
			},
		});
	};

	return (
		<div className="max-w-screen-md w-full mx-auto pt-8 lg:pt-10 border-none">
			{!post ? (
				<div className="w-full flex items-center justify-start gap-2">
					<Skeleton className="size-8 rounded-full" />
					<div className="flex flex-col justify-around">
						<Skeleton className="h-4 mb-1 w-24 rounded-full" />
						<Skeleton className="h-3 w-16 rounded-full" />
					</div>
					<Skeleton className="mx-4 h-8 w-20 rounded-full" />
					<Skeleton className="h-4 w-full md:w-40 rounded-full" />
				</div>
			) : (
				<>
					<Link
						to={`/${post?.author?.username}`}
						className="w-full flex items-center justify-start gap-2 hover:cursor-pointer ">
						<div className="flex items-center justify-start gap-2 group">
							<Avatar>
								<AvatarImage
									src={
										post?.author?.avatar ||
										"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									}
									alt={`@${post?.author?.username}`}
								/>
								<AvatarFallback>
									{(post &&
										post?.author?.full_name[0].toUpperCase()) ||
										"A"}
								</AvatarFallback>
							</Avatar>
							<div className="">
								<p
									className={
										"text-sm group-hover:underline font-semibold"
									}>{`${
									post?.author?.full_name || "No Name"
								}`}</p>
								<p
									className={
										"text-xs group-hover:underline text-muted-foreground hover:underline"
									}>
									@
									{`${
										post?.author?.username || "No Username"
									}`}
								</p>
							</div>
						</div>
						{post?.author?.id.toString() !==
						user?.id?.toString() ? (
							<Button
								variant="outline"
								className="ml-3 text-xs rounded-full"
								onClick={handleFollow}>
								{post &&
								followingIds?.includes(post?.author?.id)
									? "Following"
									: "Follow"}
							</Button>
						) : (
							<Button
								variant="outline"
								className="ml-3 text-xs rounded-full"
								asChild>
								<Link to=".">Edit profile</Link>
							</Button>
						)}
						<p className={"ml-4 text-xs text-muted-foreground"}>
							{`${moment(post?.published_at).format(
								"MMM D, YYYY"
							)}`}
						</p>
						<div className="size-1 mx-1.5 bg-accent rounded-full"></div>
						<p className={"text-xs text-muted-foreground"}>
							5 min read
						</p>
					</Link>
				</>
			)}
		</div>
	);
};

export default Author;
