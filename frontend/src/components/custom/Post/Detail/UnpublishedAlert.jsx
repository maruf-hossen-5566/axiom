import { Button } from "@/components/ui/button";
import { usePostStore } from "@/store/postStore.js";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { publishSetting } from "@/api/postApi";

const UnpublishedAlert = () => {
	const post = usePostStore((state) => state?.post);
	const setPost = usePostStore((state) => state?.setPost);

	const handlePublish = async () => {
		try {
			const res = await publishSetting({ post_id: post?.id });
			setPost({ ...post, ["published"]: res?.data?.published });
			toast.success(res?.data?.detail || "Post published successfully.");
		} catch (error) {
			console.error("Published failed: ", error);
			toast.error(error?.response?.data?.detail || "Failed to publish.");
		}
	};

	return (
		post &&
		!post?.published && (
			<div className="max-w-screen-md w-full mx-auto pt-12 pb-4 px-6 xs:px-12">
				<div className="w-full p-4 bg-yellow-500/10 flex items-center justify-between gap-2 rounded-lg border border-yellow-500/25">
					<Info className="size-5 self-start" />
					<div className="w-full text-sm mr-auto flex flex-col items-start">
						<p className="font-semibold">Not Published!</p>
						<p className="text-muted-foreground">
							Your post is unpublished. Update and publish to
							share it!
						</p>
					</div>
					<Button
						size="sm"
						className="rounded-full"
						onClick={handlePublish}>
						Publish
					</Button>
				</div>
			</div>
		)
	);
};

export default UnpublishedAlert;
