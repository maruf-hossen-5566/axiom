import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const PaginationComp = ({ data, setPageNumber }) => {
	return (
		data &&
		setPageNumber && (
			<div className="w-full flex items-center justify-between mt-4">
				<p className="pl-3 shrink-0 text-sm text-muted-foreground">
					Page {data?.current_page_number} of {data?.total_pages}
				</p>

				<Pagination className="justify-end">
					<PaginationContent>
						<PaginationItem
							disabled={data?.current_page_number === 1}>
							<PaginationLink
								onClick={() => setPageNumber(1)}
								size="icon">
								<ChevronsLeft />
							</PaginationLink>
						</PaginationItem>
						<PaginationItem
							disabled={data?.current_page_number === 1}>
							<PaginationPrevious
								onClick={() => setPageNumber(data?.previous)}
							/>
						</PaginationItem>
						<PaginationItem disabled={!data?.next}>
							<PaginationNext
								onClick={() => setPageNumber(data?.next)}
							/>
						</PaginationItem>
						<PaginationItem disabled={!data?.next}>
							<PaginationLink
								onClick={() => setPageNumber(data?.total_pages)}
								size="icon">
								<ChevronsRight />
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		)
	);
};

export default PaginationComp;
