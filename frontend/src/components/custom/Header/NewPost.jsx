import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {PenLine} from "lucide-react";

const NewPost = () => {
    return (
        <Button
            size={"icon"}
            className={"cursor-pointer rounded-full"}
        >
            <PenLine/>
        </Button>
    );
};

export default NewPost;