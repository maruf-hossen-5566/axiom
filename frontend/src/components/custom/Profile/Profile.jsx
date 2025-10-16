import { follow, blockProfile } from "@/api/profileApi";
import { getProfile } from "@/api/profileApi.js";
import SinglePost from "@/components/custom/Post/Single/SinglePost.jsx";
import ProfileSkeleton from "@/components/custom/Skeleton/ProfileSkeleton";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileStore } from "@/store/profileStore.js";
import useUserStore from "@/store/userStore.js";
import { CalendarDays, Ellipsis, Link2, MapPin } from "lucide-react";
import moment from "moment/moment.js";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
	const { username } = useParams();
	const user = useUserStore((state) => state?.user);
	const blockedIds = useUserStore((state) => state?.blockedIds);
	const setBlockedIds = useUserStore((state) => state?.setBlockedIds);
	const profile = useProfileStore((state) => state?.profile);
	const setProfile = useProfileStore((state) => state?.setProfile);
	const posts = useProfileStore((state) => state?.posts);
	const setPosts = useProfileStore((state) => state?.setPosts);
	const followingIds = useUserStore((state) => state?.followingIds);
	const setFollowingIds = useUserStore((state) => state?.setFollowingIds);
	const clearProfileStore = useProfileStore(
		(state) => state?.clearProfileStore
	);
	const navigate = useNavigate();

	useEffect(() => {
		clearProfileStore();

		const fetchProfile = async () => {
			try {
				const res = await getProfile({ username: username });
				setProfile(res?.data?.profile);
				setPosts(res?.data?.posts);
			} catch (error) {
				navigate("/");
				console.error("Profile fetch error: ", error);
				toast.error(
					error?.response?.data?.detail || "Failed to get profile"
				);
			}
		};
		fetchProfile();
	}, [username]);

	const handleFollow = async () => {
		try {
			const res = await follow({ author_id: profile?.id });
			setFollowingIds(res?.data?.following_ids);
			setProfile(res?.data?.user);
			toast.success(res?.data?.detail || "Success to follow/unfollow");
		} catch (error) {
			console.error("Follow error: ", error);
			toast.error(error?.response?.data?.detail || "Failed to follow.");
		}
	};

	const handleCopyProfile = () => {
		if (navigator && navigator.clipboard) {
			const url = window.location.href;
			navigator?.clipboard?.writeText(url);
			toast.success("URL copied to clipboard.");
		} else {
			toast.error("Navigator api is not available.");
		}
	};

	const handleBlock = async () => {
		if (
			!blockedIds?.includes(profile?.id) &&
			!confirm(`Do you really want to block "${profile?.full_name}"`)
		) {
			return;
		}
		try {
			const res = await blockProfile({ profile_id: profile?.id });
			setBlockedIds(res?.data?.blocked_ids);
			toast.success(
				res?.data?.detail || "Successfully blocked/unblocked"
			);
		} catch (error) {
			console.error("Block error: ", error);
			toast.error(
				error?.response?.data?.detail || "Failed to block/unblock"
			);
		}
	};

	return (
		<>
			{!profile && !posts ? (
				<ProfileSkeleton />
			) : (
				<div className="py-16">
					{/* <div className="w-full mb-16"> */}
					<div className="w-full px-6 md:px-12">
						<div className="max-w-screen-md w-full mb-16 py-8 mx-auto gap-x-4 items-start justify-center overflow-hidden">
							<div className="w-full mx-auto flex flex-col items-start justify-center gap-x-8">
								<div className="w-full flex max-sm:flex-col sm:items-center justify-between gap-4 sm:gap-6">
									<div className="flex items-end sm:items-center justify-start gap-4">
										<Avatar className="size-20">
											<AvatarImage
												src={
													profile?.avatar ||
													"https://github.com/shadcn.png"
												}
											/>
											<AvatarFallback
												className={"capitalize"}>
												{profile?.full_name[0] || "A"}
											</AvatarFallback>
										</Avatar>
										<div className="flex text-nowrap flex-col items-start justify-start">
											<h1 className="text-xl font-semibold">
												{profile?.full_name}
											</h1>
											<p className="text-sm text-muted-foreground">
												@{profile?.username}
											</p>
										</div>
									</div>
									<div className="w-full flex items-center justify-end gap-2">
										<Button
											variant={
												followingIds &&
												followingIds?.includes(
													profile?.id
												)
													? "outline"
													: "default"
											}
											onClick={handleFollow}
											className="max-sm:w-full max-sm:shrink rounded-full">
											{user?.id === profile?.id
												? "Edit Profile"
												: followingIds &&
												  followingIds?.includes(
														profile?.id
												  )
												? "Following"
												: "Follow"}
										</Button>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													size="icon"
													variant="ghost"
													className="rounded-full border">
													<Ellipsis />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												className="w-56 z-[1000] font-inter"
												align="end"
												loop={true}>
												<DropdownMenuItem
													onClick={handleCopyProfile}>
													Copy profile link
												</DropdownMenuItem>
												{user?.id !== profile?.id && (
													<DropdownMenuItem
														onClick={handleBlock}
														variant={
															blockedIds &&
															profile &&
															blockedIds?.includes(
																profile?.id
															)
																? "destructive"
																: ""
														}>
														{blockedIds &&
														profile &&
														blockedIds?.includes(
															profile?.id
														)
															? "Unblock"
															: "Block"}{" "}
														@{profile?.username}
													</DropdownMenuItem>
												)}
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>

								<div className="w-full text-sm flex flex-col items-start justify-start">
									<div className="w-full text-sm mt-4 mb-3 flex items-center justify-start gap-6">
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
										<p className="w-full md:w-4/5 leading-normal">
											Lorem ipsum dolor sit amet
											consectetur adipisicing elit. Fugiat
											optio reprehenderit consequatur qui.
											Nemo iure quae, dolor corporis
											accusamus ipsum.
										</p>
									</div>
									<div className="w-full mt-4 flex items-center justify-start flex-wrap gap-x-4 gap-y-2">
										<div className="w-max flex items-center justify-center gap-1.5 text-muted-foreground">
											<MapPin className="size-[1.125rem]" />
											<p>California, USA</p>
										</div>
										<div className="w-max flex items-center justify-center gap-1.5 text-muted-foreground">
											<Link2 className="-rotate-45 size-[1.125rem]" />
											<a
												className="text-blue-500 hover:underline"
												target="_blank"
												href="https://x.com/sm_maruf_60447">
												https://x.com/sm_maruf_60447
											</a>
										</div>
										<div className="w-max flex items-center justify-center gap-1.5 text-muted-foreground">
											<CalendarDays className="size-[1.125rem]" />
											<p>
												Joined{" "}
												{moment(
													profile?.date_joined
												).format("MMMM YYYY")}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="border-t px-6 md:px-12">
						<div
							className={
								"max-w-screen-xl w-full mt-16 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start justify-center"
							}>
							{posts && posts.length > 0 ? (
								posts?.map((post) => (
									<SinglePost
										key={post?.id}
										post={post}
									/>
								))
							) : (
								<div className="w-full py-32 col-span-full flex items-center justify-center border rounded-md">
									<div className="text-center">
										<p className="text-muted-foreground">
											No posts found
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
