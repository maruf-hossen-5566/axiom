import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {PenLine} from "lucide-react";
import {Link} from "react-router-dom";

const NewPostButton = () => {
    return (
        <Button
            asChild
            size={"icon"}
            className={"cursor-pointer rounded-full duration-0"}
        >
            <Link to={"/new"}>
                <PenLine/>
            </Link>
        </Button>
    );
};

export default NewPostButton;