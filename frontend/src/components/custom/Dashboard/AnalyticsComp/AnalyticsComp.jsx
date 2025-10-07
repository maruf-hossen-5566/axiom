import { getBookmarks } from "@/api/dashboardApi.js";
import PageHeader from "@/components/custom/Dashboard/PageHeader.jsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useDashboardStore } from "@/store/dashboardStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EngagementChart from "./EngagementChart";
import StatsCards from "./StatsCards";
import FollowersChart from "./FollowersChart";
import VisitorsChart from "./VisitorsChart";

const AnalyticsComp = () => {
	const [loading, setLoading] = useState(false);
	const bookmarks = useDashboardStore((state) => state?.bookmarks);
	const setBookmarks = useDashboardStore((state) => state?.setBookmarks);
	const analyticsFilter = useDashboardStore(
		(state) => state?.analyticsFilter
	);
	const setAnalyticsFilter = useDashboardStore(
		(state) => state?.setAnalyticsFilter
	);
	const setBookmarkPageNumber = useDashboardStore(
		(state) => state?.setBookmarkPageNumber
	);
	const bookmarkPageNumber = useDashboardStore(
		(state) => state?.bookmarkPageNumber
	);
	const bookmarkSearchQuery = useDashboardStore(
		(state) => state?.bookmarkSearchQuery
	);
	const setBookmarkSearchQuery = useDashboardStore(
		(state) => state?.setBookmarkSearchQuery
	);
	const fetchBookmarks = async () => {
		try {
			setLoading(true);
			const response = await getBookmarks({
				page: bookmarkPageNumber,
				query: bookmarkSearchQuery.trim(),
			});
			setBookmarks(response.data);

			setLoading(false);
		} catch (error) {
			console.log("Failed to fetch bookmarks: ", error);

			toast.error(
				error?.response?.data?.detail || "Failed to fetch bookmarks"
			);
		}
	};

	useEffect(() => {
		fetchBookmarks();
	}, [bookmarkPageNumber]);

	return (
		<div className="max-w-screen-lg w-full mx-auto px-6">
			<PageHeader
				title="Analytics"
				subtitle="Monitor your posts, engagement, and follower growth."
			/>

			<div className="w-full mb-12 flex flex-col items-start justify-start gap-6">
				<div className="w-full flex items-center justify-end gap-6">
					<Select
						value={analyticsFilter}
						onValueChange={(value) => setAnalyticsFilter(value)}>
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Filter" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7days">Last 7 days</SelectItem>
							<SelectItem value="30days">Last 30 days</SelectItem>
							<SelectItem value="3months">
								Last 3 months
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="w-full flex-items-center">
					<StatsCards />
				</div>

				<div className="w-full flex flex-col items-start justify-start gap-6">
					<VisitorsChart />
					<EngagementChart />
					<FollowersChart />
				</div>
			</div>
		</div>
	);
};

export default AnalyticsComp;
