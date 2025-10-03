import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useDashboardStore } from "@/store/dashboardStore";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { getPosts } from "@/api/dashboardApi.js";

const TablePagination = () => {
	const posts = useDashboardStore((state) => state?.posts);
	const setPosts = useDashboardStore((state) => state?.setPosts);
	const postSearchQuery = useDashboardStore(
		(state) => state?.postSearchQuery
	);

	const handlePageChange = async (pageNumber) => {
		try {
			const res = await getPosts({
				page: pageNumber,
				query: postSearchQuery,
			});
			setPosts(res?.data);
		} catch (error) {
			console.error("Post fetch error: ", error);
			toast.error(
				error?.response?.data?.detail || "Failed to fetch posts."
			);
		}
	};

	return (
		<div className="w-full flex items-center justify-between mt-4">
			<p className="pl-3 shrink-0 text-sm text-muted-foreground">
				Page {posts?.current_page_number} of {posts?.total_pages}
			</p>

			<Pagination className="justify-end">
				<PaginationContent>
					<PaginationItem disabled={posts?.current_page_number === 1}>
						<PaginationLink
							onClick={() => handlePageChange(1)}
							size="icon">
							<ChevronsLeft />
						</PaginationLink>
					</PaginationItem>
					<PaginationItem disabled={posts?.current_page_number === 1}>
						<PaginationPrevious
							onClick={() => handlePageChange(posts?.previous)}
						/>
					</PaginationItem>
					<PaginationItem disabled={!posts?.next}>
						<PaginationNext
							onClick={() => handlePageChange(posts?.next)}
						/>
					</PaginationItem>
					<PaginationItem disabled={!posts?.next}>
						<PaginationLink
							onClick={() => handlePageChange(posts?.total_pages)}
							size="icon">
							<ChevronsRight />
						</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default TablePagination;
