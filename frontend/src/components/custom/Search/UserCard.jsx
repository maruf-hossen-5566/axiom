import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.jsx";
import moment from "moment/moment.js";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";

const UserCard = ({ user }) => {
	const followingIds = useUserStore((state) => state?.followingIds);

	return (
		<div className="w-full block mx-auto">
			<Card className="w-full h-full max-w-screen-xl mx-auto flex flex-col items-start bg-sidebar dark:bg-card gap-0">
				<CardHeader
					className={"w-full flex items-center justify-start gap-2"}>
					<Link to={`/${user?.username}`}>
						<Avatar className={"size-10"}>
							<AvatarImage
								src={
									user?.avatar ||
									"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								}
								alt={user?.full_name}
							/>
							<AvatarFallback>
								{user?.author?.full_name[0] || "$"}
							</AvatarFallback>
						</Avatar>
					</Link>
					<Link
						to={`/${user?.username}`}
						className="flex flex-col justify-center group overflow-hidden">
						<p className="group-hover:underline whitespace-nowrap">{`${user?.full_name}`}</p>
						<p className="text-sm -mt-1 text-muted-foreground group-hover:underline whitespace-nowrap">
							@{`${user?.username}`}
						</p>
					</Link>
					<Button
						variant="outline"
						size="sm"
						className="ml-auto rounded-full">
						{followingIds.includes(user?.id)
							? "Unfollow"
							: "Follow"}
					</Button>
				</CardHeader>

				<CardContent className="mt-6 w-full flex items-end justify-between gap-4">
					<p className="text-sm text-muted-foreground">
						Joined {moment(user?.created_at).format("MMM D, YYYY")}
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default UserCard;
