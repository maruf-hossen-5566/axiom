import { usePostStore } from "@/store/postStore.js";
import { Skeleton } from "@/components/ui/skeleton";

const Title = () => {
	const post = usePostStore((state) => state?.post);

	return (
		<div className={"max-w-screen-md w-full mx-auto py-6 border-none"}>
			{!post || !post?.title ? (
				<>
					<Skeleton className="h-7 mb-3.5 w-full rounded-full" />
					<Skeleton className="h-7 w-4/5 rounded-full" />
				</>
			) : (
				<h1 className={"w-full text-3xl font-bold"}>{post?.title}</h1>
			)}
		</div>
	);
};

export default Title;
