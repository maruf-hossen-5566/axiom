import React, {useEffect, useRef} from 'react';
import {usePostStore} from "@/store/postStore.js";

const Title = () => {
    // const [title, setTitle] = useState("")
    const title = usePostStore(state => state?.title)
    const setTitle = usePostStore(state => state?.setTitle)
    const titleRef = useRef(null)

    const adjustHeight = () => {
        titleRef.current.style.height = 'auto';
        titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
    }

    useEffect(() => {
        adjustHeight()
    }, [title]);


    return (<div className={"max-w-screen-md w-full mx-auto py-6 xs:py-8 px-6 xs:px-12 "}>
            <textarea
                ref={titleRef}
                spellCheck={false}
                rows="1"
                className={"w-full text-3xl font-bold border-none outline-none resize-none"}
                onChange={(e) => setTitle(e?.target.value)}
                placeholder={"Title..."}
                maxLength={299}
                value={title}
            ></textarea>
    </div>);
};

export default Title;