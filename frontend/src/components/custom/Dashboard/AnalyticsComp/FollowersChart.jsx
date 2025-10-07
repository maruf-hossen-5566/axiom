import { getFollowersData } from "@/api/dashboardApi";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useDashboardStore } from "@/store/dashboardStore";
import * as React from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
	followers: {
		label: "Followers",
	},
};

const FollowersChart = () => {
	const analyticsFilter = useDashboardStore(
		(state) => state?.analyticsFilter
	);
	const [selectedFilter, setSelectedFilter] = React.useState("30 days");
	const [chartData, setChartData] = React.useState(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getFollowersData({
					filter: analyticsFilter,
				});
				setChartData(res?.data);
			} catch (error) {
				console.log("Failed to fetch posts: ", error);
			}
		};

		fetchData();

		if (analyticsFilter === "30days") {
			setSelectedFilter("30 days");
		} else if (analyticsFilter === "3months") {
			setSelectedFilter("3 months");
		} else {
			setSelectedFilter("7 days");
		}
	}, [analyticsFilter]);

	return (
		<Card className="py-0 w-full">
			<CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-6">
					<CardTitle>Followers Summary</CardTitle>
					<CardDescription>
						Showing total followers for the last {selectedFilter}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full">
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									labelFormatter={(value) => {
										return new Date(
											value
										).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
								/>
							}
						/>
						<Bar
							dataKey="followers"
							type="bump"
							fill="currentColor"
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default FollowersChart;
