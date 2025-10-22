import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {ChevronsLeft, ChevronsRight} from "lucide-react";
import {useSearchParams} from "react-router-dom";
import {cn} from "@/lib/utils.js";

const PaginationComp = ({data, className = ""}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleParamChange = (key, value) => {
        setSearchParams((prev) => {
            prev?.set(key, value);
            return prev;
        });
    };

    return (
        data && (
            <div className={cn("w-full pl-3 pr-1.5 flex items-center justify-between mt-4 overflow-hidden", className)}>
                <p className="shrink-0 max-sm:hidden text-sm text-muted-foreground">
                    Showing {data?.results?.length} of {data?.count} results
                </p>

                <Pagination className="justify-end">
                    <PaginationContent className="max-sm:w-full">
                        <PaginationItem
                            disabled={data?.current_page_number === 1}
                        >
                            <PaginationLink
                                onClick={() => handleParamChange("page", 1)}
                                size="icon"
                            >
                                <ChevronsLeft/>
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem
                            disabled={data?.current_page_number === 1}
                        >
                            <PaginationPrevious
                                onClick={() =>
                                    handleParamChange("page", data?.previous)
                                }
                            />
                        </PaginationItem>

                        <p className="max-sm:!mx-auto px-3 bg-accent py-1.5 rounded-full shrink-0 text-sm text-muted-foreground">
                            {data?.current_page_number} / {data?.total_pages}
                        </p>

                        <PaginationItem disabled={!data?.next}>
                            <PaginationNext
                                onClick={() =>
                                    handleParamChange("page", data?.next)
                                }
                            />
                        </PaginationItem>
                        <PaginationItem disabled={!data?.next}>
                            <PaginationLink
                                onClick={() =>
                                    handleParamChange("page", data?.total_pages)
                                }
                                size="icon"
                            >
                                <ChevronsRight/>
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        )
    );
};

export default PaginationComp;
