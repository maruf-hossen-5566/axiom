import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor.jsx";
import React from "react";
import {usePostStore} from "@/store/postStore.js";

const NewPost = () => {
    return (
        <>
            <SimpleEditor/>
        </>
    );
};

export default NewPost;