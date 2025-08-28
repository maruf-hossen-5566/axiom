import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {SheetContent, SheetDescription, SheetHeader, SheetTitle,} from "@/components/ui/sheet";
import {useEffect, useReducer, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import useUserStore from "@/store/userStore";
import {usePostStore} from "@/store/postStore";
import {SingleComment} from "./SingleComment";
import {addComment, getComments} from "@/api/commentApi";
import {toast} from "sonner";
import {MessageCircleOff} from "lucide-react";
import SingleCommentSkeleton from "@/components/custom/Skeleton/SingleCommentSkeleton.jsx";
import {useSearchParams} from "react-router-dom";

const Comments = () => {
    const [commentText, setCommentText] = useState("");
    const user = useUserStore((state) => state?.user);
    const post = usePostStore((state) => state?.post);
    const comments = usePostStore((state) => state?.comments);
    const setComments = usePostStore((state) => state?.setComments);
    const commentSortBy = usePostStore((state) => state?.commentSortBy);
    const setCommentSortBy = usePostStore((state) => state?.setCommentSortBy);
    const setCommentCount = usePostStore((state) => state?.setCommentCount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true)
            setComments(null);
            try {
                const res = await getComments({post: post?.id, sort: commentSortBy});
                setComments(res?.data);
            } catch (error) {
                toast.error(error?.response?.data?.detail || "Failed to fetch comments.");
            }
            setLoading(false)
        };

        fetchComments();
    }, [commentSortBy]);

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await addComment({
                post: post?.id, content: commentText,
            });
            setCommentText("");
            setComments([res?.data?.comment, ...comments]);
            setCommentCount(res?.data?.comment_count);
        } catch (error) {
            toast.error(error?.response?.data?.detail || "Failed to add comment.");
        }
        setLoading(false);
    };

    return (<>
        <SheetContent className="max-w-full xs:max-w-md w-full z-[100] overflow-y-auto pb-12">
            <SheetHeader className="px-6">
                <SheetTitle>Comments</SheetTitle>
                <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6">
                {post && !post?.disable_comment && post?.published ? (<div className="grid gap-3 px-6">
                    <div className="w-full flex items-center justify-start gap-2">
                        <Avatar className="size-6">
                            <AvatarImage
                                src={user?.avatar || "https://github.com/shadcn.png"}
                                alt={user?.username || "No username"}
                            />
                            <AvatarFallback>
                                {user?.full_name[0]?.toUpperCase() || "Not full_name"}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-sm">
                            {user?.full_name || "Anonymous"}
                        </p>
                    </div>
                    <textarea
                        placeholder="Write your comment..."
                        rows="5"
                        className="py-2 px-3 text-sm bg-input/30 border border-input outline-none rounded-sm resize-none focus:ring-2 focus:ring-accent"
                        onChange={(e) => setCommentText(e.target?.value)}
                        value={commentText}
                    ></textarea>
                    <div className="w-full flex items-center justify-end gap-2">
                        <Button
                            variant="ghost"
                            className="rounded-full"
                            disabled={loading || !commentText.trim()}
                            onClick={() => setCommentText("")}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAdd}
                            className="rounded-full"
                            disabled={loading || !commentText.trim()}
                        >
                            Comment
                        </Button>
                    </div>
                </div>) : (
                    <p className="py-12 px-6 flex flex-col items-center justify-center gap-4 text-sm text-center">
                        <MessageCircleOff/>
                        Comment has been disabled for this post.
                    </p>)}
                <div className="w-full block border-t px-6">
                    <div className="w-full pt-6 pb-8 flex items-center justify-start">
                        <Select
                            value={commentSortBy}
                            onValueChange={val => setCommentSortBy(val)}
                        >
                            <SelectTrigger className="w-40 !h-8 py-0">
                                <SelectValue
                                    placeholder="Top"
                                />
                            </SelectTrigger>
                            <SelectContent className={"z-[100]"}>
                                <SelectItem value="top">Top</SelectItem>
                                <SelectItem value="new">New</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full divide-y">
                        {!comments ? <>
                            <SingleCommentSkeleton/>
                            <SingleCommentSkeleton/>
                            <SingleCommentSkeleton/>
                            <SingleCommentSkeleton/>
                            <SingleCommentSkeleton/>
                        </> : comments?.map((comment) => (<SingleComment
                            comment={comment}
                            key={comment?.id}
                        />))}
                    </div>
                </div>
            </div>
        </SheetContent>
    </>);
};

export default Comments;
