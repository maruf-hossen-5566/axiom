import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {ChevronLeft} from "lucide-react";
import EditorHeader from "@/components/custom/Post/New/EditorHeader.jsx";

const EditorLayout = () => {
    return (<div className={"min-h-screen "}>
        <EditorHeader/>
        <Outlet/>
    </div>);
};

export default EditorLayout;