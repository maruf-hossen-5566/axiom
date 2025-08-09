import {Button} from "@/components/ui/button.jsx";
import PublishButton from "@/components/custom/Post/New/PublishButton.jsx";
import {useEditorStore} from "@/store/editorStore.js";
import {deleteThumbnail} from "@/api/postApi.js";
import {toast} from "sonner";

const Publish = () => {
    const clearPostStore = useEditorStore(state => state?.clearPostStore)
    const thumbnail = useEditorStore(state => state?.thumbnail)


    const handleCancel = async () => {
        const thumbnail_id = thumbnail?.id
        if (thumbnail_id) {
            try {
                const res = await deleteThumbnail({id: thumbnail_id})

            } catch (error) {
                toast.error(error?.response?.data?.detail || "Failed to delete thumbnail.")
            }
        }
        clearPostStore()
        window.location.replace(window.location.pathname + '?refresh=' + new Date().getTime());
    }


    return (<>
        <div className={"w-full fixed bottom-0 max-xs:hidden border-t"}>
            <div className={"max-w-screen-md w-full mx-auto flex justify-between py-2 px-2 xs:px-8 bg-white dark:bg-background"}>
                <Button
                    variant={"ghost"}
                    className={"rounded-full"}
                    onClick={handleCancel}
                >Cancel</Button>
                <PublishButton/>
            </div>
        </div>
    </>);
};

export default Publish;