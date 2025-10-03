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
	const setPosts = useDashboardStore((state) => state?.setPosts);
	const postSearchQuery = useDashboardStore(
		(state) => state?.postSearchQuery
	);
	const setPostSearchQuery = useDashboardStore(
		(state) => state?.setPostSearchQuery
	);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await getPosts({
					page: 1,
					query: postSearchQuery.trim(),
				});
				setPosts(response.data);
				console.log("response.data", response.data);

				setLoading(false);
			} catch (error) {
				console.log("Failed to fetch posts: ", error);
				toast.error(
					error?.response?.data?.detail || "Failed to fetch posts"
				);
			}
		};

		fetchPosts();
	}, [postSearchQuery]);

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
						value={postSearchQuery}
						onChange={(e) =>
							setPostSearchQuery(e?.target?.value?.trimStart())
						}
					/>

					<Select defaultValue="newest">
						<SelectTrigger className="w-44">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest</SelectItem>
							<SelectItem value="oldest">Oldest</SelectItem>
							<SelectItem value="most-views">
								Most Views
							</SelectItem>
							<SelectItem value="least-views">
								Least Views
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="w-full pt-4 pb-12 flex flex-col items-start justify-start">
					<PostTable loading={loading} />
				</div>
			</div>
		</div>
	);
};

export default Posts;
