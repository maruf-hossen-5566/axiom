import React from 'react';
import BackToHomeButton from "@/components/custom/Post/New/BackToHomeButton.jsx";

const EditorHeader = () => {
    return (<div className={"w-full xs:!hidden sticky bg-background top-0 z-50 py-2 px-4 border-b"}>
        <BackToHomeButton/>
    </div>);
};

export default EditorHeader;