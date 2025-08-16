import { SinglePostSkeleton } from "@/components/custom/Skeleton/SinglePostSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
	return (
		<div className={"py-16"}>
			<div className="max-w-screen-md w-full mb-16 py-8 mx-auto gap-x-4 items-start justify-center">
				<div className="w-full mx-auto flex items-start justify-center gap-x-8">
					<Skeleton className="size-28 flex-none rounded-full" />

					<div className="w-full text-sm flex flex-col items-start justify-start">
						<Skeleton className="h-5 w-40 rounded-full" />
						<Skeleton className="h-4 mt-1 w-32 rounded-full" />

						<div className="w-full my-4 flex items-center justify-start gap-6">
							<Skeleton className="h-3.5 w-52 rounded-full" />
						</div>
						<div className="w-full ">
							<Skeleton className="h-3.5 w-full rounded-full" />
							<Skeleton className="h-3.5 mt-2 w-4/5 rounded-full" />
						</div>
						<div className="w-full mt-5 flex items-center justify-start flex-wrap gap-x-4 gap-y-3">
							<Skeleton className="h-4 w-32 rounded-full" />
							<Skeleton className="h-4 w-52 rounded-full" />
							<Skeleton className="h-4 w-60 rounded-full" />
						</div>
					</div>
					<div className="mt-8 flex items-center justify-center gap-2">
						<Skeleton className="h-9 w-20 rounded-full" />
						<Skeleton className="size-9 rounded-full" />
					</div>
				</div>
			</div>
			<div className="border-t">
				<div
					className={
						"max-w-screen-xl w-full mt-16 mx-auto grid grid-cols-3 gap-y-6 gap-x-4 items-start justify-center"
					}>
					{[...Array(6)].map((_, i) => (
						<SinglePostSkeleton key={i} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfileSkeleton;
