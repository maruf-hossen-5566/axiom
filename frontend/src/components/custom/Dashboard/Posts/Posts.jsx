import PageHeader from "@/components/custom/Dashboard/PageHeader.jsx";
import { getPosts } from "@/api/dashboardApi.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import PostTable from "./PostTable";
import { toast } from "sonner";
import { useDashboardStore } from "@/store/dashboardStore";
import { useSearchParams } from "react-router-dom";

const Posts = () => {
	const [loading, setLoading] = useState(false);
	const posts = useDashboardStore((state) => state?.posts);
	const setPosts = useDashboardStore((state) => state?.setPosts);
	const postSearchQuery = useDashboardStore(
		(state) => state?.postSearchQuery
	);
	const setPostSearchQuery = useDashboardStore(
		(state) => state?.setPostSearchQuery
	);
	const postSortBy = useDashboardStore((state) => state?.postSortBy);
	const setPostSortBy = useDashboardStore((state) => state?.setPostSortBy);
	const postPageNumber = useDashboardStore((state) => state?.postPageNumber);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await getPosts({
					page: postPageNumber,
					query: postSearchQuery.trim(),
					sort: postSortBy,
				});
				setPosts(response.data);

				setLoading(false);
			} catch (error) {
				toast.error(
					error?.response?.data?.detail || "Failed to fetch posts"
				);
			}
		};

		fetchPosts();
	}, [postSearchQuery, postSortBy, postPageNumber]);

	return (
		<div className="max-w-screen-lg w-full mx-auto px-6">
			<PageHeader
				title="Posts"
				subtitle="Manage your blog posts and content."
			/>

			<div className="w-full flex flex-col items-start justify-start">
				<div className="w-full flex items-center justify-between gap-4">
					<Input
						placeholder="Search..."
						className="max-w-sm"
						disabled={loading || posts?.count <= 10}
						value={postSearchQuery}
						onChange={(e) =>
							setPostSearchQuery(e?.target?.value?.trimStart())
						}
					/>

					<Select
						value={postSortBy}
						onValueChange={(value) => setPostSortBy(value)}>
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest</SelectItem>
							<SelectItem value="oldest">Oldest</SelectItem>
							<SelectItem value="most-engagement">
								Most Engagement
							</SelectItem>
							<SelectItem value="least-engagement">
								Least Engagement
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="w-full pt-4 flex flex-col items-start justify-start">
					<PostTable loading={loading} />
				</div>
			</div>
		</div>
	);
};

export default Posts;
