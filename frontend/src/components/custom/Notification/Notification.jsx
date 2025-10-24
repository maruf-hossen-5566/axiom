import {Card} from "@/components/ui/card.jsx";
import {Heart, MessageCircle, Trash} from "lucide-react";
import {Link, useSearchParams} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import moment from "moment";
import {deleteNotifications} from "@/api/notificationApi.js";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.jsx";
import {useNotificationStore} from "@/store/notificationStore.js";


const Notification = ({data}) => {
    const [searchParams] = useSearchParams()
    const tab = searchParams.get("tab") || ""
    const notifications = useNotificationStore(state => state?.notifications)
    const setNotifications = useNotificationStore(state => state?.setNotifications)

    const handleDeleteNotifications = async (e, n) => {
        e.stopImmediatePropagation()

        try {
            const res = await deleteNotifications({id: n?.id})
            const newNotifications = notifications?.results?.filter((i) => i?.id !== n?.id)
            setNotifications({...notifications, ["results"]: newNotifications})

            toast.success(res?.data?.detail || "Notification has been deleted.")
        } catch (error) {
            console.log("Delete error: ", error)
            toast.error(error?.response?.data?.detail || "Failed to delete notification.")
        }
    }

    if (data && data["type"] === "comment") {
        return (
            <div className="w-full py-2 border-b">
                <Card
                    className="w-full mx-auto px-4 py-6 flex flex-row items-start justify-start gap-5 overflow-hidden rounded-none border-none bg-transparent hover:bg-input/30 shadow-none"
                >
                    <div className="w-full flex items-start justify-start gap-4">
                        <Link
                            to={`/${data?.post?.author?.username}/${data?.post?.slug}?show-comments=true&id=${data?.reference}`}
                            className="size-12 relative shrink-0"
                        >
                            <Avatar className="size-full">
                                <AvatarImage src={data?.actor?.avatar || "https://github.com/shadcn.png"}/>
                                <AvatarFallback>{data?.actor?.full_name[0]}</AvatarFallback>
                            </Avatar>
                            {
                                tab === "" &&
                                <div className="absolute right-0 bottom-0 size-6 bg-background p-1 flex items-center justify-center rounded-full">
                                    <MessageCircle
                                        className="mb-[2px] size-full shrink-0"
                                        fill="currentColor"
                                    />
                                </div>
                            }
                        </Link>

                        <div className="w-full flex flex-col items-start justify-center">
                            <Link
                                to={`/${data?.post?.author?.username}/${data?.post?.slug}?show-comments=true&id=${data?.reference}`}
                                className="font-normal dark:font-light"
                            >
                                <span className="font-semibold opacity-100 dark:font-medium">
                                    {data?.actor?.full_name}
                                </span>
                                <span className="opacity-90">{" "}commented on your post{" "}</span>
                                <span className="font-semibold opacity-100 dark:font-medium">
                                    {data?.post?.title}
                                </span>
                            </Link>
                            <Link
                                to={`/${data?.post?.author?.username}/${data?.post?.slug}?show-comments=true&id=${data?.reference}`}
                                className="w-full mt-3 p-2.5 border rounded-md"
                            >{data?.content}</Link>
                            <div className="w-full mt-6 flex items-center justify-between gap-4">
                                <p className="text-sm">{moment(data?.created_at).format("DD MMM YYYY, hh:mm a")}</p>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-full hover:bg-background"
                                    onClick={() => handleDeleteNotifications(data)}
                                >
                                    <Trash/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if (data && data["type"] === "reply") {
        return (
            <div className="w-full py-2 border-b">
                <Card
                    className="w-full mx-auto px-4 py-6 flex flex-row items-start justify-start gap-5 overflow-hidden rounded-none border-none bg-transparent hover:bg-input/30 shadow-none"
                >
                    <div className="w-full flex items-start justify-start gap-4">
                        <Link
                            to={`/${data?.post?.author?.username}/${data?.post?.slug}?show-comments=true&show-replies=true&id=${data?.reference}`}
                            className="size-12 relative shrink-0"
                        >
                            <Avatar className="size-full">
                                <AvatarImage src={data?.actor?.avatar || "https://github.com/shadcn.png"}/>
                                <AvatarFallback>{data?.actor?.full_name[0]}</AvatarFallback>
                            </Avatar>
                            {
                                tab === "" &&
                                <div className="absolute right-0 bottom-0 size-6 bg-background p-1 flex items-center justify-center rounded-full">
                                    <MessageCircle
                                        className="size-full shrink-0"
                                        fill="currentColor"
                                    />
                                </div>
                            }
                        </Link>

                        <div className="w-full flex flex-col items-start justify-center">
                            <Link
                                to={`/${data?.post?.author?.username}/${data?.post?.slug}?show-comments=true&show-replies=true&id=${data?.reference}`}
                                className="font-normal dark:font-light"
                            >
                                <span className="font-semibold opacity-100 dark:font-medium hover:underline">
                                    {data?.actor?.full_name}
                                </span>
                                <span className="opacity-90">{" "}replied on your comment{" "}</span>
                            </Link>
                            <Link
                                to={`/${data?.post?.author?.username}/${data?.post?.slug}?show-comments=true&show-replies=true&id=${data?.reference}`}
                                className="w-full mt-3 p-2.5 border rounded-md"
                            >{data?.content}</Link>
                            <div className="w-full mt-6 flex items-center justify-between gap-4">
                                <p className="text-sm">{moment(data?.created_at).format("DD MMM YYYY, hh:mm a")}</p>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-full hover:bg-background"
                                    onClick={() => handleDeleteNotifications(data)}
                                >
                                    <Trash/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full py-2 border-b">
            <Card className="w-full mx-auto px-4 py-6 group flex flex-row items-start justify-start gap-5 overflow-hidden rounded-none border-none bg-transparent hover:bg-input/30 shadow-none">
                <div className="w-full flex items-start justify-start gap-4">
                    <div className="size-12 relative shrink-0">
                        <Avatar className="size-full">
                            <AvatarImage src={data?.actor?.avatar || "https://github.com/shadcn.png"}/>
                            <AvatarFallback>{data?.actor?.full_name[0]}</AvatarFallback>
                        </Avatar>
                        {
                            tab === "" &&
                            <div className="absolute right-0 bottom-0 size-6 bg-background p-1 flex items-center justify-center rounded-full">
                                <Heart
                                    className="mt-[1px] size-full shrink-0"
                                    fill="currentColor"
                                />
                            </div>
                        }
                    </div>

                    <div className="w-full flex flex-col items-start justify-center">
                        <p className="font-normal dark:font-light">
                            <Link
                                to={`/${data?.actor?.username}`}
                                className="font-semibold opacity-100 dark:font-medium hover:underline"
                            >{data?.actor?.full_name}</Link>
                            <span className="opacity-90">{" "}liked your post{" "}</span>
                            <Link
                                to={`/${data?.post?.author?.username}/${data?.post?.slug}`}
                                className="font-semibold opacity-100 dark:font-medium hover:underline"
                            >{data?.post?.title}</Link>
                        </p>
                        <div className="w-full mt-6 flex items-center justify-between gap-4">
                            <p className="text-sm">{moment(data?.created_at).format("DD MMM YYYY, hh:mm a")}</p>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full hover:bg-background"
                                onClick={(e) => handleDeleteNotifications(e, data)}
                            >
                                <Trash/>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )

};

export default Notification;