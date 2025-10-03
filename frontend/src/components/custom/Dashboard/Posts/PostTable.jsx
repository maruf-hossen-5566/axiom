import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button.jsx";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useDashboardStore } from "@/store/dashboardStore";
import { Ellipsis, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import ActionDropdown from "./ActionDropdown";
import TablePagination from "./TablePagination";

const PostTable = ({ loading }) => {
	const posts = useDashboardStore((state) => state?.posts);

	return (
		<>
			<div className="w-full border rounded-md overflow-hidden">
				{loading ? (
					<div className="w-full flex items-center justify-center py-64 px-4">
						<Loader2 className="animate-spin" />
					</div>
				) : posts?.results?.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow className="!bg-accent">
								<TableHead className="min-w-[400px] max-w-[400px] py-4 px-4">
									Title
								</TableHead>
								<TableHead className="min-w-[200px] max-w-[200px] py-4 px-4">
									Status
								</TableHead>
								<TableHead className="min-w-[200px] max-w-[200px] py-4 px-4">
									Date
								</TableHead>
								<TableHead className="min-w-[100px] max-w-[100px] py-4 px-4">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody className="w-full">
							{posts?.results?.map((post, index) => (
								<TableRow key={index}>
									<TableCell className="min-w-[400px] max-w-[400px] py-4 px-4 text-ellipsis overflow-hidden">
										<Link
											to={`/${post?.author?.username}/${post?.slug}`}
											className="hover:underline">
											{post?.title}
										</Link>
									</TableCell>
									<TableCell className="min-w-[200px] max-w-[200px] py-4 px-4">
										{post?.published ? (
											<Badge className="bg-green-500/25 text-green-600 dark:text-green-400 rounded-full">
												Published
											</Badge>
										) : (
											<Badge className="bg-yellow-500/25 text-yellow-600 dark:text-yellow-400 rounded-full">
												Draft
											</Badge>
										)}
									</TableCell>
									<TableCell className="min-w-[200px] max-w-[200px] py-4 px-4">
										{moment(post?.created_at).format(
											"MMM D, YYYY"
										)}
									</TableCell>
									<TableCell className="min-w-[100px] max-w-[100px] py-4 px-4">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													size="icon"
													variant="ghost"
													className="rounded-full">
													<Ellipsis />
												</Button>
											</DropdownMenuTrigger>
											<ActionDropdown postId={post?.id} />
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<div className="w-full flex items-center justify-center py-24 px-4">
						<p>No results</p>
					</div>
				)}
			</div>

			<TablePagination />
		</>
	);
};

export default PostTable;
