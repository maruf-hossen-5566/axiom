import { Skeleton } from "@/components/ui/skeleton";

const PostDetailSkeleton = () => {
	return (
		<div className="max-w-screen-md w-full pb-16 prose dark:prose-invert border-b-0 flex flex-col gap-3.5">
			{[...Array(16)].map((_, i) => (
				<div
					className="w-full flex flex-col gap-3.5"
					key={i}>
					<Skeleton className="h-4 w-full rounded-full" />
					<Skeleton className="h-4 w-full rounded-full" />
					<Skeleton className="h-4 mb-4 w-4/5 rounded-full" />
				</div>
			))}
		</div>
	);
};

export default PostDetailSkeleton;
