import { SinglePostSkeleton } from "@/components/custom/Skeleton/SinglePostSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const ProfileSkeleton = () => {
	return (
		<div className="py-16">
			<div className="w-full px-6 md:px-12">
				<div className="max-w-screen-sm w-full mb-16 py-8 mx-auto gap-x-4 items-start justify-center overflow-hidden">
					<div className="w-full mx-auto flex flex-col items-start justify-center gap-4">
						<div className="w-full flex max-sm:flex-col sm:items-center justify-between gap-4 sm:gap-6">
							<div className="flex items-end sm:items-center justify-start gap-4">
								<Skeleton className="size-20 shrink-0 rounded-full" />
								<div className="w-full shrink-0 flex text-nowrap flex-col items-start justify-start gap-2">
									<Skeleton className="h-6 w-32 rounded-full" />
									<Skeleton className="h-4 w-20 rounded-full" />
								</div>
							</div>
							<div className="w-full flex items-center justify-end gap-2">
								<Skeleton className="w-full sm:w-24 h-9 rounded-full" />
								<Skeleton className="size-9 shrink-0 rounded-full" />
							</div>
						</div>

						<div className="w-full text-sm flex flex-col items-start justify-start gap-4">
							<div className="w-full text-sm flex items-center justify-start gap-6">
								<Skeleton className="h-4 w-24 rounded-full" />
								<Skeleton className="h-4 w-24 rounded-full" />
							</div>

							<div className="w-full flex flex-col items-start justify-start gap-3">
								<Skeleton className="h-4 w-full rounded-full" />
								<Skeleton className="h-4 w-4/5 rounded-full" />
							</div>
							<div className="w-full flex items-center justify-start flex-wrap gap-x-4 gap-y-2">
								<Skeleton className="h-4 w-24 rounded-full" />
								<Skeleton className="h-4 w-32 rounded-full" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="border-t px-6 md:px-12">
				<div
					className={
						"max-w-screen-xl w-full mt-24 mx-auto flex items-center justify-center"
					}>
					<Loader2 className="size-10 animate-spin" />
				</div>
			</div>
		</div>
	);
};

export default ProfileSkeleton;
