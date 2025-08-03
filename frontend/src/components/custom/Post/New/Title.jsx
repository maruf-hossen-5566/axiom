import React, {useState} from 'react';
import {Input} from "@/components/ui/input.jsx";

const Title = () => {
    const [title, setTitle] = useState("")

    return (
        <div className={"max-w-screen-md w-full mx-auto py-6 xs:py-8 px-6 xs:px-12 "}>
            <textarea
                spellCheck={false}
                className={"w-full text-3xl pt-1.5 font-bold field-sizing-content border-none outline-none resize-none"}
                onChange={(e) => setTitle(e?.target.value)}
                placeholder={"Title..."}
            >{title}</textarea>
        </div>
    );
};

export default Title;