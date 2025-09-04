import { Button } from "@/components/ui/button.jsx";
import PublishSetting from "@/components/custom/Post/New/PublishSetting.jsx";
import { useEditorStore } from "@/store/editorStore.js";
import { deleteThumbnail } from "@/api/postApi.js";
import { toast } from "sonner";

const Publish = () => {
	const clearEditorStore = useEditorStore((state) => state?.clearEditorStore);
	const thumbnail = useEditorStore((state) => state?.thumbnail);

	const handleCancel = async () => {
		if (thumbnail && thumbnail?.id) {
			try {
				const res = await deleteThumbnail({ id: thumbnail?.id });
			} catch (error) {
				toast.error(
					error?.response?.data?.detail ||
						"Failed to delete thumbnail."
				);
			}
		}
		clearEditorStore();
	};

	return (
		<>
			<div className={"w-full fixed bottom-0 max-xs:hidden border-t"}>
				<div
					className={
						"max-w-screen-md w-full mx-auto flex justify-between py-2 px-2 xs:px-8 bg-white dark:bg-background"
					}>
					<Button
						variant={"ghost"}
						className={"rounded-full"}
						onClick={handleCancel}>
						Reset
					</Button>
					<PublishSetting />
				</div>
			</div>
		</>
	);
};

export default Publish;
