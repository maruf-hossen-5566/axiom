import {addPost} from "@/api/postApi.js";
import {getTags, getTagsOnPostSubmit} from "@/api/tagApi.js";
import {Button} from "@/components/ui/button.jsx";
import {
    Command, CommandEmpty, CommandInput, CommandItem, CommandList
} from "@/components/ui/command";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {
    Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {Switch} from "@/components/ui/switch";
import {useEditorStore} from "@/store/editorStore.js";
import capitalize from "capitalize";
import {X} from "lucide-react";
import moment from "moment";
import pluralize from "pluralize";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import slugify from "slugify";
import {toast} from "sonner";

const PublishSetting = () => {
    const editor = useEditorStore();
    const [loading, setLoading] = useState(false);
    const thumbnail = useEditorStore((state) => state?.thumbnail);
    const clearEditorStore = useEditorStore((state) => state?.clearEditorStore);
    const navigate = useNavigate();
    const tags = useEditorStore((state) => state?.tags);
    const setTags = useEditorStore((state) => state?.setTags);
    const [fetchedTags, setFetchedTags] = useState([]);
    const [tagQuery, setTagQuery] = useState("");

    const handlePublish = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isEmpty = editor?.title?.trim() === "" || !editor?.content?.content[0].content || !editor?.content?.content[0]?.content[0]?.text?.trim();

        if (isEmpty) {
            toast.warning("Please add Title and Content properly.");
            setLoading(false);
            return;
        }

        const data = {
            title: editor?.title,
            content: JSON.stringify(editor?.content),
            published: editor?.published,
            disable_like: editor?.disableLike,
            disable_comment: editor?.disableComment,
            tags: tags,
        };

        if (thumbnail) {
            data["thumbnail_id"] = thumbnail?.id;
        }

        const toastId = toast.loading("Loading...", {duration: Infinity});
        try {
            const res = await addPost(data);
            const post = res?.data?.post;

            navigate(`/${post?.author?.username}/${post?.slug}`);
            clearEditorStore();

            toast.success(res?.data?.detail || "Post has been created successfully.", {id: toastId, duration: 4000});
        } catch (error) {
            console.log("Error: ", error);
            toast.error(error?.response?.data?.detail || "Failed to create post.", {id: toastId, duration: 4000});
        }
        setLoading(false);
    };

    const handleRemoveTag = (tag) => {
        const filteredTags = tags?.filter((t) => t?.id !== tag?.id);
        setTags(filteredTags);
    };

    const handleAddTag = (tag) => {
        const alreadyExists = tags?.find((t) => t?.id === tag?.id || t?.name?.toLowerCase() === tag?.name?.toLowerCase());
        const exceed25Char = tag?.name?.trim()?.length > 25;

        if (exceed25Char) {
            toast.warning("Tag name must be ≤ 25 characters.");
            return;
        }

        if (alreadyExists) {
            toast.warning("Tag with this name already exists.");
            return;
        }
        setTagQuery("");
        setTags([tag, ...tags]);
    };

    const fetchTags = async () => {
        const data = {
            query: tagQuery.trim(), exclude: tags?.map((t) => t?.id),
        };

        try {
            const res = await getTagsOnPostSubmit(data);
            let newTags = res?.data;

            if (newTags?.length <= 0) {
                const newTag = {
                    id: crypto?.randomUUID(),
                    name: capitalize.words(tagQuery?.trim()),
                    created_at: moment(Date.now()).format(),
                    slug: slugify(tagQuery?.trim(), {lower: true}),
                    post_count: 0,
                };
                newTags?.push(newTag)
            }
            setFetchedTags(newTags);
        } catch (error) {
            console.log("Fetch tag error: ", error);
            toast.error(error?.response?.data?.detail || `Failed to fetch tags for "${tagQuery}"`);
        }
    };

    useEffect(() => {
        if (tagQuery?.trim() !== "") {
            fetchTags();
        } else {
            setFetchedTags([]);
        }
    }, [tagQuery]);

    return (<>
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    disabled={loading}
                    className={"ml-auto rounded-full"}
                >
                    Publish
                </Button>
            </SheetTrigger>

            <SheetContent className="max-w-full xs:max-w-md w-full z-[100] overflow-y-auto">
                <SheetHeader className="border-b">
                    <SheetTitle>Post settings</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="w-full flex flex-col px-4 space-y-8 divide-y pt-5">
                    <div className="w-full pb-8 flex flex-col space-y-10">
                        <div className="w-full flex items-start justify-between gap-2">
                            <Label
                                htmlFor="publish"
                                className="w-full flex flex-col items-start gap-1.5"
                            >
                                Publish
                                <p className="text-xs text-muted-foreground">
                                    Toggle to set the post as published and
                                    visible or unpublished and private.
                                </p>
                            </Label>
                            <Switch
                                id="publish"
                                checked={editor?.published}
                                onCheckedChange={() => {
                                    editor?.setPublished(!editor?.published);
                                }}
                            />
                        </div>
                        <div className="w-full flex items-start justify-between gap-2 ">
                            <Label
                                htmlFor="disable-like"
                                className="w-full flex flex-col items-start gap-1.5"
                            >
                                Disable Like
                                <p className="text-xs text-muted-foreground">
                                    Toggle to set the post as published and
                                    visible or unpublished and private.
                                </p>
                            </Label>
                            <Switch
                                id="disable-like"
                                checked={editor?.disableLike}
                                onCheckedChange={() => {
                                    editor?.setDisableLike(!editor?.disableLike);
                                }}
                            />
                        </div>
                        <div className="w-full flex items-start justify-between gap-2 ">
                            <Label
                                htmlFor="disable-comment"
                                className="w-full flex flex-col items-start gap-1.5"
                            >
                                Disable Comment
                                <p className="text-xs text-muted-foreground">
                                    Toggle to set the post as published and
                                    visible or unpublished and private.
                                </p>
                            </Label>
                            <Switch
                                id="disable-comment"
                                checked={editor?.disableComment}
                                onCheckedChange={() => {
                                    editor?.setDisableComment(!editor?.disableComment);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full pb-8 flex flex-col items-start justify-between gap-2">
                        <div className="relative w-full flex flex-col gap-2">
                            <Label htmlFor="tags-input">Tags</Label>
                            <Command className="px-0 w-full flex flex-col gap-1">
                                <CommandInput
                                    type="text"
                                    className="tags-input"
                                    disabled={tags?.length >= 5}
                                    placeholder="Search tag..."
                                    value={capitalize
                                        .words(tagQuery)
                                        .trimStart()}
                                    onValueChange={setTagQuery}
                                />
                                {/*{fetchedTags &&*/}
                                {fetchedTags?.length > 0 && document.activeElement === document.querySelector(".tags-input") && (
                                    <CommandList className="utline-none border-t">
                                        {fetchedTags?.map((tag) => (<CommandItem
                                            className="py-2 rounded-none"
                                            key={tag?.id}
                                            value={tag?.name}
                                            onSelect={() => handleAddTag(tag)}
                                        >
                                            <div className="w-full flex items-center justify-between gap-2">
                                                <div className="flex flex-col items-start justify-start">
                                                    <p className="text-base font-medium line-clamp-1">
                                                        {tag.name}
                                                    </p>
                                                    <div className="w-full flex items-center justify-start gap-2">
                                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                                            #{tag.slug}
                                                        </p>
                                                        <Separator
                                                            orientation="vertical"
                                                            className="!h-3"
                                                        />
                                                        <p className="text-sm text-muted-foreground text-nowrap">
                                                            {tag?.post_count}{" "}
                                                            {pluralize("post", tag?.post_count)}
                                                        </p>
                                                    </div>
                                                </div>
                                                {tag?.logo_url && (<img
                                                    src={tag?.logo_url}
                                                    className="size-8"
                                                />)}
                                            </div>
                                        </CommandItem>))}
                                        <CommandEmpty>
                                            No results found.
                                        </CommandEmpty>
                                    </CommandList>)}
                            </Command>
                        </div>
                        {tags?.length > 0 && (<div className="w-full mt-2 flex flex-wrap gap-2">
                            {tags?.map((tag) => (<Button
                                className="rounded-full max-w-full overflow-hidden"
                                size="sm"
                                key={tag?.id}
                                onClick={() => handleRemoveTag(tag)}
                            >
                                {tag?.name}
                                <X/>
                            </Button>))}
                        </div>)}
                    </div>
                </div>
                <SheetFooter>
                    <Button
                        disabled={loading}
                        onClick={(e) => handlePublish(e)}
                        className="w-full rounded-full"
                    >
                        {editor && !editor?.published ? "Draft" : "Publish"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </>);
};

export default PublishSetting;
