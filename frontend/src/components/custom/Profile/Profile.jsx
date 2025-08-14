import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "@/api/profileApi.js";
import { useProfileStore } from "@/store/profileStore.js";
import SinglePost from "@/components/custom/Post/Single/SinglePost.jsx";
import { Ellipsis, CalendarDays, MapPin } from "lucide-react";
import moment from "moment/moment.js";

const Profile = () => {
	const { username } = useParams();
	const profile = useProfileStore((state) => state?.profile);
	const followerCount = useProfileStore((state) => state?.followerCount);
	const followingCount = useProfileStore((state) => state?.followingCount);
	const isFollowing = useProfileStore((state) => state?.isFollowing);
	const posts = useProfileStore((state) => state?.posts);
	const setProfile = useProfileStore((state) => state?.setProfile);
	const setPosts = useProfileStore((state) => state?.setPosts);
	const setFollowerCount = useProfileStore(
		(state) => state?.setFollowerCount
	);
	const setFollowingCount = useProfileStore(
		(state) => state?.setFollowingCount
	);
	const setIsFollowing = useProfileStore((state) => state?.setIsFollowing);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await getProfile({ username: username });
				setProfile(res?.data?.profile);
				setPosts(res?.data?.posts);
			} catch (error) {
				console.error("Profile fetch error: ", error);
			}
		};
		fetchProfile();
	}, []);

	return (
		<>
			<div className={"py-16"}>
				{/* <div className="w-full mb-16"> */}
				<div className="max-w-screen-md w-full mb-16 py-8 mx-auto gap-x-4 items-start justify-center">
					<div className="w-full mx-auto flex items-start justify-center gap-x-8">
						<Avatar className="size-28">
							<AvatarImage
								src={
									profile?.avatar ||
									"https://github.com/shadcn.png"
								}
							/>
							<AvatarFallback className={"capitalize"}>
								{profile?.full_name[0] || "A"}
							</AvatarFallback>
						</Avatar>
						<div className="w-full text-sm flex flex-col items-start justify-start">
							<h1 className="text-xl font-semibold">
								{profile?.full_name}
							</h1>
							<p className="text-muted-foreground">
								@{profile?.username}
							</p>
							<div className="w-full my-3 flex items-center justify-start gap-6">
								<p>
									{profile?.follower_count}{" "}
									<span className="text-muted-foreground">
										Followers
									</span>
								</p>
								<p>
									{profile?.following_count}{" "}
									<span className="text-muted-foreground">
										Following
									</span>
								</p>
							</div>
							<div className="w-full flex items-center justify-start gap-4">
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Fugiat optio reprehenderit
									consequatur qui. Nemo iure quae, dolor
									corporis accusamus ipsum.
								</p>
							</div>
							<div className="w-full mt-4 flex items-center justify-start flex-wrap gap-x-8 gap-y-2">
								<div className="w-max flex items-center justify-center gap-2 text-muted-foreground">
									<MapPin className="size-[1.125rem]" />
									<p>NYC, NY</p>
								</div>
								<div className="w-max flex items-center justify-center gap-2 text-muted-foreground">
									<CalendarDays className="size-[1.125rem]" />
									<p>
										Joined on{" "}
										{moment(profile?.date_joined).format(
											"MMMM YYYY"
										)}
									</p>
								</div>
								<div className="w-max flex items-center justify-center gap-2 text-muted-foreground">
									<CalendarDays className="size-[1.125rem]" />
									<p>
										Joined on{" "}
										{moment(profile?.date_joined).format(
											"MMMM YYYY"
										)}
									</p>
								</div>
							</div>
						</div>
						<div className="mt-8 flex items-center justify-center gap-2">
							<Button className="rounded-full">Follow</Button>

							<Button
								size="icon"
								variant="ghost"
								className="rounded-full">
								<Ellipsis />
							</Button>
						</div>
					</div>
				</div>
				<div className="border-t">
					<div
						className={
							"max-w-screen-xl w-full mt-16 mx-auto grid grid-cols-3 gap-y-6 gap-x-4 items-start justify-center"
						}>
						{posts &&
							posts?.map((post) => (
								<SinglePost
									key={post?.id}
									post={post}
								/>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
