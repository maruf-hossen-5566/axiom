import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {toast} from "sonner";
import {getPostDetail} from "@/api/postApi.js";
import {generateHTML} from '@tiptap/html'
import {StarterKit} from "@tiptap/starter-kit";
import Youtube from '@tiptap/extension-youtube'
import {TableKit} from "@tiptap/extension-table";
import {ImageUploadNode} from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import {HorizontalRule} from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import {Image} from "@tiptap/extension-image"
import {TaskItem, TaskList} from "@tiptap/extension-list"
import {TextAlign} from "@tiptap/extension-text-align"
import {Typography} from "@tiptap/extension-typography"
import {Highlight} from "@tiptap/extension-highlight"
import {Subscript} from "@tiptap/extension-subscript"
import {Superscript} from "@tiptap/extension-superscript"
import {Placeholder, Selection} from "@tiptap/extensions"
import {usePostDetailStore} from "@/store/postDetailStore.js";
import Title from "@/components/custom/Post/Detail/Title.jsx";

const extensions = [
    StarterKit,
    TextAlign,
    TaskList,
    TaskItem,
    Highlight,
    Image,
    Typography,
    Superscript,
    Subscript,
    Selection,
    ImageUploadNode,
    Placeholder,
    Youtube,
    TableKit,
]

const PostDetail = () => {
    const {author, slug} = useParams()
    const [post, setPost] = useState(null)
    const title = usePostDetailStore(state => state?.title)
    const setTitle = usePostDetailStore(state => state?.setTitle)
    const content = usePostDetailStore(state => state?.content)
    const setContent = usePostDetailStore(state => state?.setContent)


    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const res = await getPostDetail(author, slug)
                setPost(res?.data)
            } catch (error) {
                console.error("Error: ", error)
                toast.error(error?.response?.data?.detail || "Failed to fetch post detail.")
            }
        }
        fetchPostDetail()
    }, [author, slug]);

    useEffect(() => {
        if (post) {
            const html = generateHTML(JSON.parse(post?.content), extensions)
            setContent(html)
        }
    }, [post, content, setContent]);


    return (
        <div className={"min-h-screen max-w-screen-md w-full mx-auto px-6 xs:px-12"}>
            {
                !post ? "loading..." :
                    <>
                        <Title title={post?.title}/>
                    <div
                        className="prose dark:prose-invert w-full "
                        dangerouslySetInnerHTML={{__html: content}}
                    ></div>
                    </>
            }
        </div>
    );
};

export default PostDetail;