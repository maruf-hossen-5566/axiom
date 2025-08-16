import { Skeleton } from "@/components/ui/skeleton";

export const SinglePostSkeleton = () => {
	return (
		<div className="h-full w-full p-6">
			<Skeleton className="aspect-video w-full" />
			<Skeleton className="h-4 my-4 w-3/5 rounded-full" />
			<Skeleton className="h-5 mb-3 w-full rounded-full" />
			<Skeleton className="h-5 w-4/5 rounded-full" />
			<div className="w-full mt-3.5 flex items-center gap-2">
				<Skeleton className="size-7 rounded-full" />
				<Skeleton className="h-4 my-4 w-32 rounded-full" />
			</div>
		</div>
	);
};
