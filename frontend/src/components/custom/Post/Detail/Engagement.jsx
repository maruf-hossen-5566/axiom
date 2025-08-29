import {addPost, bookmarkPost, commentSetting, deletePost, likePost, likeSetting, publishSetting,} from "@/api/postApi";
import {Button} from "@/components/ui/Button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Sheet, SheetTrigger} from "@/components/ui/sheet";
import {usePostStore} from "@/store/postStore.js";
import useUserStore from "@/store/userStore.js";
import {Bookmark, Ellipsis, Heart, MessageCircle, Share} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import Comments from "./Comments";

const Engagement = () => {
    const user = useUserStore((state) => state?.user);
    const comments = usePostStore((state) => state?.comments);
    const post = usePostStore((state) => state?.post);
    const bookmarkedIds = useUserStore((state) => state?.bookmarkedIds);
    const setBookmarkedIds = useUserStore((state) => state?.setBookmarkedIds);
    const setPost = usePostStore((state) => state?.setPost);
    const clearPostStore = usePostStore((state) => state?.clearPostStore);
    const navigate = useNavigate();

    const handleLike = async () => {
        try {
            const res = await likePost({post: post?.id});

            setPost({...post, is_liked: res?.data?.is_liked, like_count: res?.data?.like_count})
        } catch (error) {
            toast.error(error?.response?.data?.detail || "Failed to like post.");
        }
    };

    const handleBookmark = async () => {
        try {
            const res = await bookmarkPost({post_id: post?.id});
            setBookmarkedIds(res?.data?.bookmarked_ids);
            toast.info(res?.data?.detail || "Bookmark saved/removed.");
        } catch (error) {
            toast.error(error?.response?.data?.detail || "Failed to bookmark.");
        }
    };

    const handleShare = () => {
        if (navigator && navigator.clipboard) {
            const url = window.location.href;
            navigator?.clipboard?.writeText(url);
            toast.success("URL copied to clipboard.");
        } else {
            toast.error("Navigator api is not available.");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Do you really want to delete this post?")) {
            return;
        }

        const toastId = toast.loading("Loading...", {duration: Infinity})
        try {
            await deletePost({post_id: post?.id})

            navigate("/");
            setTimeout(() => {
                clearPostStore();
                toast.success("Post deleted successfully.", {id: toastId, duration: 4000});
            }, 500);
        } catch (error) {
            toast.error(error?.response?.data?.detail || "Failed to delete post", {id: toastId, duration: 4000})
        }
    };

    const handleLikeSetting = async () => {
        try {
            const res = await likeSetting({post_id: post?.id});
            setPost({...post, ["disable_like"]: res?.data?.disable_like});
            toast.success(res?.data?.detail || "Setting updated.");
        } catch (error) {
            toast.error(error?.response?.data?.detail || "Failed to disable/enable like.");
        }
    };

    const handleCommentSetting = async () => {
        try {
            const res = await commentSetting({post_id: post?.id});
            setPost({
                ...post, ["disable_comment"]: res?.data?.disable_comment,
            });
            toast.success(res?.data?.detail || "Setting has been updated.");
        } catch (error) {
            toast.error(error?.response?.data?.detail || "Failed to disable/enable like.");
        }
    };

    const handlePublishSetting = async () => {
        try {
            const res = await publishSetting({post_id: post?.id});
            setPost({...post, ["published"]: res?.data?.published});
            toast.success(res?.data?.detail || "Post setting updated.");
        } catch (error) {
            console.error("Publish setting failed: ", error);

            toast.error(error?.response?.data?.detail || "Failed to update post setting.");
        }
    };

    return (<div className="max-w-screen-md bg-background block w-full border-t py-4 max-xs:px-3 max-sm:px-9 border-b">
        <div className="flex items-center justify-between sm:justify-start gap-4 ">
            <Button
                variant="ghost"
                className="text-xs rounded-full disabled:cursor-not-allowed"
                onClick={handleLike}
                disabled={post && (post?.disable_like || !post?.published)}
            >
                <>
                    <Heart fill={post?.is_liked ? "currentColor" : "none"}/>
                    {post?.like_count && post?.like_count > 0 ? (post?.like_count) : (
                        <span className="max-sm:hidden">Like</span>)}
                </>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className={`text-xs rounded-full  ${comments && !comments?.length > 0 && " max-sm:size-9"}`}
                        disabled={post && !post?.published}
                    >
                        <>
                            <MessageCircle/>
                            {post?.comment_count > 0 ? (post?.comment_count) : (<span className="max-sm:hidden">
										Comment
									</span>)}
                        </>
                    </Button>
                </SheetTrigger>
                <Comments/>
            </Sheet>
            <Button
                variant="ghost"
                size={bookmarkedIds && bookmarkedIds?.includes(post?.id) ? "icon" : "default"}
                className="text-xs max-sm:size-9 sm:ml-auto rounded-full "
                onClick={handleBookmark}
            >
                <>
                    <Bookmark
                        fill={bookmarkedIds && bookmarkedIds?.includes(post?.id) ? "currentColor" : "none"}
                    />
                    {bookmarkedIds && !bookmarkedIds?.includes(post?.id) && (
                        <span className="max-sm:hidden">Bookmark</span>)}
                </>
            </Button>
            <Button
                variant="ghost"
                className="text-xs max-sm:size-9 rounded-full "
                onClick={handleShare}
            >
                <>
                    <Share/>
                    <span className="max-sm:hidden">Share</span>
                </>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-xs rounded-full "
                    >
                        <Ellipsis/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 z-[100]"
                    align="end"
                >
                    {user && user?.id === post?.author?.id && (<>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={handlePublishSetting}
                        >
                            {post && post?.published ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLikeSetting}>
                            {post && post?.disable_like ? "Enable like" : "Disable like"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleCommentSetting}
                        >
                            {post && post?.disable_comment ? "Enable comment" : "Disable comment"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                    </>)}
                    {user && user?.id === post?.author?.id ? (<DropdownMenuItem
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Delete
                    </DropdownMenuItem>) : (<>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => alert("It's just for demonstration purpose.")}
                        >
                            Report
                        </DropdownMenuItem>
                    </>)}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>);
};

export default Engagement;
