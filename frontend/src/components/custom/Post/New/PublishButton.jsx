import React, {useState} from 'react';
import {Button} from "@/components/ui/button.jsx";
import {toast} from "sonner";
import {addPost} from "@/api/postApi.js";
import {useEditorStore} from "@/store/editorStore.js";
import {useNavigate} from "react-router-dom";

const PublishButton = () => {
    const post = useEditorStore()
    const [loading, setLoading] = useState(false)
    const thumbnail = useEditorStore(state => state?.thumbnail)
    const clearPostStore = useEditorStore(state => state?.clearPostStore)
    const navigate = useNavigate()


    const handlePublish = (e) => {
        e.preventDefault()
        setLoading(true)

        const isEmpty = post?.title?.trim() === "" || !post?.content?.content[0].content || !post?.content?.content[0]?.content[0]?.text?.trim()

        if (isEmpty) {
            toast.warning("Please add Title and Content properly.")
            setLoading(false)
            return
        }

        const data = {
            title: post?.title,
            content: JSON.stringify(post?.content),
        }

        if (thumbnail) {
            data["thumbnail_id"] = thumbnail?.id
        }


        toast.promise(addPost(data), {
            loading: "Loading...", success: (res) => {
                navigate("/")
                clearPostStore()
                return res?.data?.detail || "Post has been created successfully."
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
