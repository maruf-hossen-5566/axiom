import { getBlockList } from "@/api/dashboardApi.js";
import { blockProfile } from "@/api/profileApi.js";
import PageHeader from "@/components/custom/Dashboard/PageHeader.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useDashboardStore } from "@/store/dashboardStore";
import useUserStore from "@/store/userStore";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import PaginationComp from "../Pagination/Pagination";
import Follower from "../Followers/Follower";
import { Loader2 } from "lucide-react";

const Blocked = () => {
	const [loading, setLoading] = useState(false);
	const blockList = useDashboardStore((state) => state?.blockList);
	const setBlockList = useDashboardStore((state) => state?.setBlockList);
	const blockedIds = useUserStore((state) => state?.blockedIds);
	const setBlockedIds = useUserStore((state) => state?.setBlockedIds);
	const blockListSearchQuery = useDashboardStore(
		(state) => state?.blockListSearchQuery
	);
	const setBlockListSearchQuery = useDashboardStore(
		(state) => state?.setBlockListSearchQuery
	);
	const blockListPageNumber = useDashboardStore(
		(state) => state?.blockListPageNumber
	);
	const setBlockListPageNumber = useDashboardStore(
		(state) => state?.setBlockListPageNumber
	);

	useEffect(() => {
		const fetchBlockList = async () => {
			setLoading(true);
			try {
				const res = await getBlockList({
					page: blockListPageNumber,
					query: blockListSearchQuery.trim(),
				});
				setBlockList(res.data);
			} catch (error) {
				console.log("error: ", error);
				toast.error(
					error?.response?.data?.detail || "Failed to fetch followers"
				);
			}
			setLoading(false);
		};

		fetchBlockList();
	}, [blockListSearchQuery, blockListPageNumber]);

	const handleUnblock = async (userId) => {
		try {
			const res = await blockProfile({ profile_id: userId });
			setBlockedIds(res?.data?.blocked_ids);

			const newBlockList = blockList?.results?.filter(
				(u) => u?.id !== userId
			);
			setBlockList({ ...blockList, results: newBlockList });
			toast.info(res?.data?.detail || "Unblocked successfully.");
		} catch (error) {
			console.log("Error: ", error);
			toast.error(error?.response?.data?.detail || "Failed to unblock.");
		}
	};

	const handelOnchange = (e) => {
		setBlockListSearchQuery(e?.target?.value?.trimStart());
		setBlockListPageNumber(1);
	};

	return (
		<div className="max-w-screen-lg w-full mx-auto px-6">
			<PageHeader
				title="Followers"
				subtitle="Manage your followers."
			/>

			<div className="w-full mb-12 flex flex-col items-start justify-start">
				<div className="w-full mb-12 flex items-center justify-between gap-6">
					<Input
						placeholder="Search..."
						className="max-w-md"
						disabled={loading || blockList?.count <= 10}
						value={blockListSearchQuery}
						onChange={(e) => handelOnchange(e)}
					/>
				</div>

				{loading ? (
					<div className="w-full flex items-center justify-center py-44 px-4 border rounded-xl">
						<Loader2 className="animate-spin" />
					</div>
				) : blockList && blockList?.results?.length > 0 ? (
					<div className="max-w-screen- w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 items-start justify-center">
						{blockList?.results?.map((user) => (
							<Follower
								key={user.id}
								follower={user}
								buttonText={"Unblock"}
								handleAction={() => handleUnblock(user?.id)}
							/>
						))}
					</div>
				) : (
					<div className="w-full flex items-center justify-center py-24 px-4 border rounded-md">
						<p>No results</p>
					</div>
				)}
			</div>
			{blockList?.results?.length > 0 && (
				<PaginationComp
					data={blockList}
					setPageNumber={setBlockListPageNumber}
				/>
			)}
		</div>
	);
};

export default Blocked;
