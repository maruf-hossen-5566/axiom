import React from 'react';
import {Link} from "react-router-dom";
import {ArrowLeft, ChevronLeft} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";

const BackToHomeButton = () => {
    return (
        <>
            <Button
                asChild
                variant={"ghost"}
                className={"!p-2 rounded-full accent-accent cursor-pointer"}
                size={"icon"}
            >
                <Link to={"/"}>
                    <>
                        {/*<ChevronLeft/>*/}
                        <ArrowLeft/>
                    </>
                </Link>
            </Button>
        </>
    );
};

export default BackToHomeButton;