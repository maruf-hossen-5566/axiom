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
import { X } from "lucide-react";

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
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page");

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const response = await getPosts({
					page: page,
					query: postSearchQuery.trim(),
					sort: postSortBy,
				});
				setPosts(response.data);
			} catch (error) {
				toast.error(
					error?.response?.data?.detail || "Failed to fetch posts"
				);
			}
			setLoading(false);
		};

		fetchPosts();
	}, [postSearchQuery, postSortBy, page]);

	const handelOnchange = (e) => {
		setPostSearchQuery(e?.target?.value?.trimStart());
		setPostSortBy("newest");
		setPostPageNumber(1);
	};

	return (
		<div className="max-w-screen-lg w-full mx-auto px-6">
			<PageHeader
				title="Posts"
				subtitle="Manage your blog posts and content."
			/>

			<div className="w-full flex flex-col items-start justify-start">
				<div className="w-full mb-12 flex max-xs:!flex-col md:items-start justify-between gap-4">
					<div className="w-full flex items-center justify-start gap-1">
						<Input
							placeholder="Search..."
							className="max-w-md"
							disabled={posts?.count <= 10}
							value={postSearchQuery}
							onChange={(e) => handelOnchange(e)}
						/>
						{postSearchQuery?.trim().length > 0 && (
							<Button
								variant="ghost"
								size="sm"
								disabled={loading}
								onClick={() => setPostSearchQuery("")}>
								Clear
							</Button>
						)}
					</div>

					<Select
						value={postSortBy}
						onValueChange={(value) => setPostSortBy(value)}>
						<SelectTrigger
							className="w-full xs:w-44"
							disabled={posts?.count <= 10}>
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

				<div className="w-full flex flex-col items-start justify-start">
					<PostTable loading={loading} />
				</div>
			</div>
		</div>
	);
};

export default Posts;
