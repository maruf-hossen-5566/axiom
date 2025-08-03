import React, {useRef, useState} from 'react';
import {Button} from "@/components/ui/button.jsx";
import {ImagePlay, ImagePlus, LoaderCircle, RefreshCcw, Repeat, X} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {toast} from "sonner";

const Thumbnail = () => {
    const previewRef = useRef("");
    const [preview, setPreview] = useState(null)
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleFileChange = async (e) => {
        const file = e?.target?.files[0]
        const fileType = file?.type?.split("/")[0]

        if (fileType !== "image") {
            toast.warning("Invalid file type")
            inputRef.current.value = ""
            inputRef.current.files = []
            setLoading(false)
            return
        }

        setLoading(true)
        await sleep(1000)

        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setPreview(reader.result)
                setLoading(false)
            }

        }
    }

    const handleRemove = () => {
        setLoading(false)
        setPreview(null)
        inputRef.current.value = ""
        inputRef.current.files = []
    }


    return (<div className={"max-w-screen-xl w-full mx-auto pt-6 xs:pt-12 lg:px-12 "}>
        {!preview && !loading ? <div className={"max-w-screen-md w-full mx-auto px-3 xs:px-9 "}>
                <Button
                    variant={"ghost"}
                    className={"cursor-pointer rounded-full"}
                    asChild
                >
                    <Label htmlFor="thumbnail">
                        <>
                            <ImagePlus/> Thumbnail
                        </>
                    </Label>
                </Button>
            </div> :
            <div className={`relative w-full aspect-video flex items-center justify-center ${loading && "border rounded-sm"}`}>
                {loading ? <LoaderCircle className={"self-center animate-spin"}/> : <>
                    <div
                        className="absolute top-3 right-3 w-max flex items-center justify-center gap-2"
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size={"icon"}
                                    className={"cursor-pointer"}
                                    asChild
                                >
                                    <Label htmlFor="thumbnail">
                                        <RefreshCcw/>
                                    </Label>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Select again</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size={"icon"}
                                    className={"cursor-pointer"}
                                    onClick={handleRemove}
                                >
                                    <X/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Remove</TooltipContent>
                        </Tooltip>
                    </div>
                    <img
                        ref={previewRef}
                        src={preview || "https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Thumbnail"
                        className={"size-full object-center object-cover lg:rounded-sm"}
                    />
                </>}
            </div>}
        <Input
            ref={inputRef}
            id="thumbnail"
            type={"file"}
            className={"hidden"}
            onChange={handleFileChange}
        />
    </div>);
};

export default Thumbnail;