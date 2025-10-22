import { follow } from "@/api/profileApi.js";
import PageHeader from "@/components/custom/Dashboard/PageHeader.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useDashboardStore } from "@/store/dashboardStore";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import PaginationComp from "../Pagination/Pagination";
import { getFollowing } from "@/api/dashboardApi";
import Follower from "../Followers/Follower";
import useUserStore from "@/store/userStore";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Following = () => {
	const [loading, setLoading] = useState(false);
	const following = useDashboardStore((state) => state?.following);
	const setFollowing = useDashboardStore((state) => state?.setFollowing);
	const followingSearchQuery = useDashboardStore(
		(state) => state?.followingSearchQuery
	);
	const setFollowingSearchQuery = useDashboardStore(
		(state) => state?.setFollowingSearchQuery
	);
	const setFollowingIds = useUserStore((state) => state?.setFollowingIds);
	const followingIds = useUserStore((state) => state?.followingIds);
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page");

	useEffect(() => {
		const fetchFollowing = async () => {
			setLoading(true);
			try {
				const res = await getFollowing({
					page: page,
					query: followingSearchQuery.trim(),
				});
				setFollowing(res.data);
				setLoading(false);
			} catch (error) {
				toast.error(
					error?.response?.data?.detail || "Failed to fetch followers"
				);
			}
			setLoading(false);
		};

		fetchFollowing();
	}, [page, followingSearchQuery]);

	const handelOnchange = (e) => {
		setFollowingSearchQuery(e?.target?.value?.trimStart());
	};

	const handleFollow = async (followingId) => {
		try {
			const res = await follow({ author_id: followingId });

			setFollowingIds(res?.data?.following_ids);

			const newFollowing = following?.results?.filter(
				(f) => followingId !== f?.id
			);

			setFollowing({ ...following, results: newFollowing });
			toast.info(res?.data?.detail || "Unfollowed user.");
		} catch (error) {
			toast.error(
				error?.response?.data?.detail || "Failed to unfollow user."
			);
		}
	};

	return (
		<div className="max-w-screen-lg w-full mx-auto px-6">
			<PageHeader
				title="Following"
				subtitle="Manage the people you follow."
			/>

			<div className="w-full mb-12 flex flex-col items-start justify-start">
				<div className="w-full mb-12 flex items-center justify-between gap-6">
					<Input
						placeholder="Search..."
						className="max-w-md"
						disabled={loading || following?.count <= 10}
						value={followingSearchQuery}
						onChange={(e) => handelOnchange(e)}
					/>
				</div>

				{loading ? (
					<div className="w-full flex items-center justify-center py-44 px-4 border rounded-xl">
						<Loader2 className="animate-spin" />
					</div>
				) : following && following?.results?.length > 0 ? (
					<div className="max-w-screen- w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 items-start justify-center">
						{following?.results?.map((follower) => (
							<Follower
								key={follower.id}
								follower={follower}
								buttonText={
									followingIds?.includes(follower?.id)
										? "Unfollow"
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
			{following?.results?.length > 0 && (
				<PaginationComp data={following} />
			)}
		</div>
	);
};

export default Following;
