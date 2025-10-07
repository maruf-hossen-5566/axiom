import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboardStore";
import { useEffect, useState } from "react";
import { getCardData } from "@/api/dashboardApi";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const StatsCards = () => {
	const [loading, setLoading] = useState(false);
	const [visitorsData, setVisitorsData] = useState(null);
	const [engagementData, setEngagementData] = useState(null);
	const [followerData, setFollowerData] = useState(null);

	useEffect(() => {
		const fetchCardData = async () => {
			setLoading(true);
			try {
				const res = await getCardData();
				setVisitorsData(res?.data?.visitors);
				setEngagementData(res?.data?.engagement);
				setFollowerData(res?.data?.follower);
			} catch (error) {
				console.log("Failed to fetch card data: ", error);
				toast.error(
					error?.response?.data?.detail ||
						"Failed to fetch card data."
				);
			}
			setLoading(false);
		};

		fetchCardData();
	}, []);

	return (
		<div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-start justify-center">
			<Card className="gap-3">
				<CardHeader>
					<CardTitle>Visitors</CardTitle>
					<CardDescription>All-time visitors</CardDescription>
				</CardHeader>
				<CardContent>
					{loading ? (
						<Skeleton className="h-9 w-24 rounded-full" />
					) : (
						<h1 className="text-3xl font-bold">
							{visitorsData || "272,345"}
						</h1>
					)}
				</CardContent>
			</Card>

			<Card className="gap-3">
				<CardHeader>
					<CardTitle>Engagement</CardTitle>
					<CardDescription>Total likes and comments</CardDescription>
				</CardHeader>
				<CardContent>
					{loading ? (
						<Skeleton className="h-9 w-24 rounded-full" />
					) : (
						<h1 className="text-3xl font-bold">
							{engagementData || "272,345"}
						</h1>
					)}
				</CardContent>
			</Card>

			<Card className="gap-3">
				<CardHeader>
					<CardTitle>Followers</CardTitle>
					<CardDescription>Total followers</CardDescription>
				</CardHeader>
				<CardContent>
					{loading ? (
						<Skeleton className="h-9 w-24 rounded-full" />
					) : (
						<h1 className="text-3xl font-bold">
							{followerData || "272,345"}
						</h1>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default StatsCards;
