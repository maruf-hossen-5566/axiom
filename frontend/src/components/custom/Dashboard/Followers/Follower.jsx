import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useUserStore from "@/store/userStore";
import moment from "moment";
import { Link } from "react-router-dom";

const Follower = ({ follower, handleFollow }) => {
	const followingIds = useUserStore((state) => state?.followingIds);

	return (
		<Card
			className={
				"w-full h-full col-span-1 bg-sidebar dark:bg-card gap-0"
			}>
			<CardHeader>
				<p className="w-full text-end text-xs text-muted-foreground">
					Since {moment(follower?.created_at).format("MMM D, YYYY")}
				</p>
			</CardHeader>

			<CardContent className="mt-6 w-full flex items-center justify-between gap-2">
				<Link
					to={`/${follower?.username}`}
					className="w-max shrink-0 flex flex-1 items-center gap-2 overflow-hidden">
					<Avatar className="size-9">
						<AvatarImage
							src={
								follower?.avatar ||
								"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt={`@${follower?.author?.username}`}
						/>
						<AvatarFallback>ER</AvatarFallback>
					</Avatar>
					<div className="shrink-0 flex flex-col hover:underline">
						<p
							className={
								"text-sm font-normal hover:underline"
							}>{`${follower?.full_name || "No Name"}`}</p>
						<p className={"text-xs text-muted-foreground"}>
							@{`${follower?.username || "No Username"}`}
						</p>
					</div>
				</Link>
				<div className="flex items-end justify-between gap-4">
					<Button
						variant="outline"
						size="sm"
						className="rounded-full"
						onClick={handleFollow}>
						{followingIds && followingIds?.includes(follower?.id)
							? "Unfollow"
							: "Follow"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default Follower;
