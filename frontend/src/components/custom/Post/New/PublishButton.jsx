import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { addPost } from "@/api/postApi.js";
import { useEditorStore } from "@/store/editorStore.js";
import { useNavigate } from "react-router-dom";

const PublishButton = () => {
	const editor = useEditorStore();
	const [loading, setLoading] = useState(false);
	const thumbnail = useEditorStore((state) => state?.thumbnail);
	const clearEditorStore = useEditorStore((state) => state?.clearEditorStore);
	const navigate = useNavigate();
	const tags = useEditorStore((state) => state?.tags);
	const setTags = useEditorStore((state) => state?.setTags);

	const handlePublish = (e) => {
		e.preventDefault();
		setLoading(true);

		const isEmpty =
			editor?.title?.trim() === "" ||
			!editor?.content?.content[0].content ||
			!editor?.content?.content[0]?.content[0]?.text?.trim();

		if (isEmpty) {
			toast.warning("Please add Title and Content properly.");
			setLoading(false);
			return;
		}

		const data = {
			title: editor?.title,
			content: JSON.stringify(editor?.content),
			publish: editor?.publish,
			disable_like: editor?.disableLike,
			disable_comment: editor?.disableComment,
			tag: editor?.tags,
		};

		if (thumbnail) {
			data["thumbnail_id"] = thumbnail?.id;
		}

		toast.promise(addPost(data), {
			loading: "Loading...",
			success: (res) => {
				navigate("/");
				clearEditorStore();
				return (
					res?.data?.detail || "Post has been created successfully."
				);
			},
			error: (error) => {
				console.log("Error: ", error);
				return (
					error?.response?.data?.detail || "Failed to create post."
				);
			},
		});
		setLoading(false);
	};

	const handleRemoveTag = (tag) => {
		const filteredTags = tags?.filter((t) => t?.id !== tag?.id);
		setTags(filteredTags);
	};

	const handleTagAdd = (e) => {
		if (e?.key === "Enter") {
			if (e?.target?.value?.trim() === "") {
				return;
			}

			const tagId = crypto?.randomUUID();
			const tag = {
				id: tagId,
				name: e?.target?.value,
			};
			setTags([...tags, tag]);
			e.target.value = "";
		}
	};

	return (
		<>
			{/* <Sheet open={true}> */}
			<Sheet>
				<SheetTrigger asChild>
					<Button
						disabled={loading}
						// onClick={(e) => handlePublish(e)}
						className={"ml-auto rounded-full"}>
						Publish
					</Button>
				</SheetTrigger>

				<SheetContent className="z-[100] overflow-y-auto">
					<SheetHeader className="border-b">
						<SheetTitle>Post settings</SheetTitle>
						<SheetDescription></SheetDescription>
					</SheetHeader>
					<div className="w-full flex flex-col px-4 space-y-8 divide-y pt-5">
						<div className="w-full pb-8 flex flex-col space-y-8">
							<div className="w-full flex items-start justify-between gap-2">
								<div className="w-full flex flex-col items-start justify-center gap-1.5">
									<Label htmlFor="publish">Publish</Label>
									<p className="text-xs text-muted-foreground">
										Toggle to set the post as published and
										visible or unpublished and private.
									</p>
								</div>
								<Switch
									id="publish"
									checked={editor?.publish}
									onCheckedChange={() => {
										editor?.setPublish(!editor?.publish);
									}}
								/>
							</div>
							<div className="w-full flex items-start justify-between gap-2 ">
								<div className="w-full flex flex-col items-start justify-center gap-1.5">
									<Label htmlFor="disable-like">
										Disable Like
									</Label>
									<p className="text-xs text-muted-foreground">
										Toggle to set the post as published and
										visible or unpublished and private.
									</p>
								</div>
								<Switch
									id="disable-like"
									checked={editor?.disableLike}
									onCheckedChange={() => {
										editor?.setDisableLike(
											!editor?.disableLike
										);
									}}
								/>
							</div>
							<div className="w-full flex items-start justify-between gap-2 ">
								<div className="w-full flex flex-col items-start justify-center gap-1.5">
									<Label htmlFor="disable-comment">
										Disable Comment
									</Label>
									<p className="text-xs text-muted-foreground">
										Toggle to set the post as published and
										visible or unpublished and private.
									</p>
								</div>
								<Switch
									id="disable-comment"
									checked={editor?.disableComment}
									onCheckedChange={() => {
										editor?.setDisableComment(
											!editor?.disableComment
										);
									}}
								/>
							</div>
						</div>

						<div className="w-full pb-8 flex flex-col items-start justify-between gap-2">
							<div className="w-full flex flex-wrap gap-2">
								<Label htmlFor="tags-input">Tags</Label>
								<Input
									type="text"
									id="tags-input"
									placeholder="Start typing to search..."
									disabled={tags?.length >= 5}
									onKeyDown={(e) => handleTagAdd(e)}
								/>
							</div>
							{tags?.length > 0 && (
								<div className="w-full mt-2 flex flex-wrap gap-2">
									{tags?.map((tag) => (
										<Button
											className="rounded-full"
											size="sm"
											key={tag?.id}
											onClick={() =>
												handleRemoveTag(tag)
											}>
											{tag?.name}
											<X />
										</Button>
									))}
								</div>
							)}
						</div>
					</div>
					<SheetFooter>
						<Button
							disabled={loading}
							onClick={(e) => handlePublish(e)}
							className="w-full rounded-full">
							Publish
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default PublishButton;
