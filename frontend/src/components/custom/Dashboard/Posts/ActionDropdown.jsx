import {deletePost} from "@/api/postApi";
import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {useDashboardStore} from "@/store/dashboardStore";
import {toast} from "sonner";

const ActionDropdown = ({postId}) => {
    const posts = useDashboardStore((state) => state?.posts);
    const setPosts = useDashboardStore((state) => state?.setPosts);

    const handleDelete = async () => {
        if (!confirm("Do you really want to delete this post?")) {
            return;
        }

        const toastId = toast.loading("Loading...", {duration: Infinity});
        try {
            await deletePost({post_id: postId});
            const newPosts = posts?.results?.filter((post) => post?.id !== postId)
            setPosts({...posts, results: newPosts});

            toast.success("Post deleted successfully.", {
                id: toastId,
                duration: 4000,
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.detail || "Failed to delete post",
                {id: toastId, duration: 4000}
            );
        }
    };

    return (
        <DropdownMenuContent
            align="end"
            className="w-40"
        >
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
                variant="destructive"
                onClick={handleDelete}
            >
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
};

export default ActionDropdown;
