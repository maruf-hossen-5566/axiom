import React, {useState} from 'react';
import {Button} from "@/components/ui/button.jsx";
import {toast} from "sonner";
import {addPost} from "@/api/postApi.js";
import {usePostStore} from "@/store/postStore.js";

const PublishButton = () => {
    const post = usePostStore()
    const [loading, setLoading] = useState(false)

    const data = {
        title: post?.title, content: JSON.stringify(post?.content)
    }


    const handlePublish = (e) => {
        e.preventDefault()
        setLoading(true)

        toast.promise(addPost(data), {
            loading: "Loading...", success: (res) => {
                return res?.data?.detail || "Post added."
            }, error: (error) => {
                console.log("Error: ", error)
                return error?.response?.data?.detail || "Failed to create post."
            }
        })
        setLoading(false)

    }

    return <>
        <Button
            disabled={loading}
            onClick={(e) => handlePublish(e)}
            className={"ml-auto rounded-full"}
        >Publish</Button>
    </>
};

export default PublishButton;
