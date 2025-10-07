import { getBookmarks } from "@/api/dashboardApi.js";
import PageHeader from "@/components/custom/Dashboard/PageHeader.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useDashboardStore } from "@/store/dashboardStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Bookmark from "./Bookmark";
import PaginationComp from "../Pagination/Pagination";
import { Button } from "@/components/ui/button.jsx";

const Bookmarks = () => {
	const [loading, setLoading] = useState(false);
	const bookmarks = useDashboardStore((state) => state?.bookmarks);
	const setBookmarks = useDashboardStore((state) => state?.setBookmarks);
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
		setLoading(true);
		try {
			const response = await getBookmarks({
				page: bookmarkPageNumber,
				query: bookmarkSearchQuery.trim(),
			});
			setBookmarks(response.data);
		} catch (error) {
			console.log("Failed to fetch bookmarks: ", error);

			toast.error(
				error?.response?.data?.detail || "Failed to fetch bookmarks"
			);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchBookmarks();
	}, [bookmarkPageNumber, bookmarkSearchQuery]);

	const handelOnchange = (e) => {
		setBookmarkSearchQuery(e?.target?.value?.trimStart());
		setBookmarkPageNumber(1);
	};

	return (
		<div className="max-w-screen-lg w-full mx-auto px-6">
			<PageHeader
				title="Bookmarks"
				subtitle="Manage your bookmarks and saved content."
			/>

			<div className="w-full mb-12 flex flex-col items-start justify-start">
				<div className="w-full mb-12 flex items-center justify-start gap-1">
					<Input
						placeholder="Search..."
						className="max-w-md"
						disabled={bookmarks?.count <= 10}
						value={bookmarkSearchQuery}
						onChange={(e) => handelOnchange(e)}
					/>
					{bookmarkSearchQuery?.trim().length > 0 && (
						<Button
							variant="ghost"
							size="sm"
							disabled={loading}
							onClick={() => setBookmarkSearchQuery("")}>
							Clear
						</Button>
					)}
				</div>

				{bookmarks?.results?.length > 0 ? (
					<div className="max-w-screen- w-full mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-start justify-center">
						{bookmarks?.results?.map((bookmark) => (
							<Bookmark
								key={bookmark.id}
								bookmark={bookmark}
							/>
						))}
					</div>
				) : (
					<div className="w-full flex items-center justify-center py-24 px-4 border rounded-md">
						<p>No results</p>
					</div>
				)}
			</div>

			{bookmarks?.results?.length > 0 && (
				<PaginationComp
					data={bookmarks}
					setPageNumber={setBookmarkPageNumber}
				/>
			)}
		</div>
	);
};

export default Bookmarks;
