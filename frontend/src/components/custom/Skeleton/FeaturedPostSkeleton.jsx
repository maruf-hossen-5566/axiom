import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.jsx";
import moment from "moment/moment.js";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export const FeaturedPostSkeleton = () => {
	return (
		<div className="w-full h-full py-6 max-w-screen-xl mb-16 mx-auto grid grid-cols-7 items-start justify-center bg-transparent gap-0 shadow-none pointer-events-none border rounded-xl">
			<div className={"col-span-3 px-6"}>
				<Skeleton className="w-full aspect-video" />
			</div>

			<div className={"col-span-4 self-center px-6"}>
				<Skeleton className="h-4 w-44 rounded-full" />
				<div className="mt-4 flex flex-col gap-1.5">
					<Skeleton className="h-6 w-full rounded-full" />
					<Skeleton className="h-6 w-4/5 rounded-full" />
				</div>

				<div className="mt-4 flex flex-col gap-1.5">
					<Skeleton className="h-3.5 w-full rounded-full" />
					<Skeleton className="h-3.5 w-full rounded-full" />
					<Skeleton className="h-3.5 w-4/5 rounded-full" />
				</div>

				<div className="w-full mt-4 flex items-center gap-2">
					<Skeleton className="size-6 rounded-full" />
					<Skeleton className="h-4 w-40 rounded-full" />
				</div>
			</div>
		</div>
	);
};

export default FeaturedPostSkeleton;
