import { getBookmarks } from "@/api/dashboardApi.js";
import PageHeader from "@/components/custom/Dashboard/PageHeader.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useDashboardStore } from "@/store/dashboardStore";
import useUserStore from "@/store/userStore";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import PaginationComp from "../Pagination/Pagination";
import { getFollowers } from "@/api/dashboardApi";
import Follower from "./Follower";
import { follow } from "@/api/profileApi";
import {Check, Loader2} from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Followers = () => {
	const [loading, setLoading] = useState(false);
	const followers = useDashboardStore((state) => state?.followers);
	const followingIds = useUserStore((state) => state?.followingIds);
	const setFollowers = useDashboardStore((state) => state?.setFollowers);
	const setFollowingIds = useUserStore((state) => state?.setFollowingIds);
	const followersSearchQuery = useDashboardStore(
		(state) => state?.followersSearchQuery
	);
	const setFollowersSearchQuery = useDashboardStore(
		(state) => state?.setFollowersSearchQuery
	);
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page");

	useEffect(() => {
		const fetchFollowers = async () => {
			setLoading(true);
			try {
				const res = await getFollowers({
					page: page,
					query: followersSearchQuery.trim(),
				});
				setFollowers(res.data);
			} catch (error) {
				console.log("error: ", error);
				toast.error(
					error?.response?.data?.detail || "Failed to fetch followers"
				);
			}
			setLoading(false);
		};

		fetchFollowers();
	}, [followersSearchQuery, page]);

	const handleFollow = async (followingId) => {
		try {
			const res = await follow({ author_id: followingId });
			setFollowingIds(res?.data?.following_ids);
			toast.info(res?.data?.detail || "Unfollowed user.");
		} catch (error) {
			console.log("Error: ", error);

			toast.error(
				error?.response?.data?.detail || "Failed to unfollow user."
			);
		}
	};

	const handelOnchange = (e) => {
		setFollowersSearchQuery(e?.target?.value?.trimStart());
	};

	return (
		<div className="max-w-screen-lg w-full mx-auto px-6">
			<PageHeader
				title="Followers"
				subtitle="Manage the people who follow you."
			/>

			<div className="w-full mb-12 flex flex-col items-start justify-start">
				<div className="w-full mb-12 flex items-center justify-between gap-6">
					<Input
						placeholder="Search..."
						className="max-w-md"
						disabled={loading || followers?.count <= 10}
						value={followersSearchQuery}
						onChange={(e) => handelOnchange(e)}
					/>
				</div>

				{loading ? (
					<div className="w-full flex items-center justify-center py-44 px-4 border rounded-xl">
						<Loader2 className="animate-spin" />
					</div>
				) : followers && followers?.results?.length > 0 ? (
					<div className="max-w-screen- w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 items-start justify-center">
						{followers?.results?.map((follower) => (
							<Follower
								key={follower.id}
								follower={follower}
								buttonText={
									followingIds?.includes(follower?.id)
										? <>{<Check/>}Following</>
										: "Follow"
								}
								handleAction={() => handleFollow(follower?.id)}
							/>
						))}
					</div>
				) : (
					<div className="w-full flex items-center justify-center py-24 px-4 border rounded-md">
						<p>No results</p>
					</div>
				)}
			</div>
			{followers?.results?.length > 0 && (
				<PaginationComp data={followers} />
			)}
		</div>
	);
};

export default Followers;
