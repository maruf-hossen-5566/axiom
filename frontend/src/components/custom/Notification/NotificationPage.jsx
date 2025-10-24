import React, {useEffect, useState} from 'react';
import {deleteNotifications, getNotifications} from "@/api/notificationApi.js";
import {Link, useSearchParams} from "react-router-dom";
import {toast} from "sonner";
import {useNotificationStore} from "@/store/notificationStore.js";
import Notification from "@/components/custom/Notification/Notification.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Heart, Loader2, MessageCircle, Trash} from "lucide-react";
import PaginationComp from "@/components/custom/Dashboard/Pagination/Pagination.jsx";

const NotificationPage = () => {
    const notifications = useNotificationStore(state => state?.notifications)
    const setNotifications = useNotificationStore(state => state?.setNotifications)
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const page = searchParams.get("page")
    const tab = searchParams.get("tab") || ""

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true)
            try {
                const res = await getNotifications({page: page, tab: tab})
                setNotifications(res?.data)
            } catch (error) {
                console.log("Notification fetch error: ", error)
                toast.error(error?.response?.data?.detail || "Failed to fetch notifications.")
            }
            setLoading(false)
        }

        fetchNotifications()
    }, [page, tab]);

    const handleDeleteNotifications = async () => {
        try {
            const res = await deleteNotifications({id: null})
            setNotifications(null)
            toast.success(res?.data?.detail || "Notifications has been deleted.")
        } catch (error) {
            console.log("Delete error: ", error)
            toast.error(error?.response?.data?.detail || "Failed to delete all notifications.")
        }
    }

    return (<div className="w-full flex flex-col items-start justify-start">
        <div className="max-w-screen-md px-6 py-16 mx-auto w-full flex flex-col items-start justify-start ">
            <div className="w-full flex flex-col items-start justify-start gap-12">
                <h2 className="text-2xl font-semibold">Notifications</h2>
                <div className="w-full relative pb-6 flex items-center justify-between gap-4 border-b overflow-x-auto">
                    <div className="flex items-center justify-start gap-2">
                        <Button
                            className="rounded-full"
                            variant={tab === "" ? "secondary" : "ghost"}
                            asChild
                        >
                            <Link
                                to=""
                            >All</Link>
                        </Button>
                        <Button
                            className="rounded-full"
                            variant={tab === "like" ? "secondary" : "ghost"}
                            asChild
                        >
                            <Link
                                to="?tab=like"
                            >
                                <Heart/>
                                Like
                            </Link>
                        </Button>
                        <Button
                            className="rounded-full"
                            variant={tab === "comment" ? "secondary" : "ghost"}
                            asChild
                        >
                            <Link
                                to="?tab=comment"
                            >
                                <MessageCircle/>
                                Comment
                            </Link>
                        </Button>
                    </div>
                    <div className="sticky right-0 bg-background flex items-center justify-start gap-2 rounded-full">
                        <Button
                            className="rounded-full"
                            variant="outline"
                            onClick={() => handleDeleteNotifications()}
                            disabled={notifications && notifications.count < 5}
                        >
                            <>
                                <Trash/>
                                Delete all
                            </>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start divide divide-y">
                {loading
                    ?
                    <>
                        <div className="w-full pt-28 px-6 flex justify-center">
                            <Loader2 className="animate-spin"/>
                        </div>
                    </>
                    :
                    notifications?.results?.length > 0
                        ?
                        notifications?.results?.map((n) => (<Notification
                            data={n}
                            key={n?.id}
                        />))
                        :
                        <div className="w-full mt-6 flex items-center justify-center py-24 px-4 border rounded-md">
                            <p>No notifications yet.</p>
                        </div>
                }
            </div>
            {!loading && notifications?.count > 10 && <PaginationComp
                data={notifications}
                className="mt-0 pt-6"
            />}
        </div>
    </div>);
};

export default NotificationPage;