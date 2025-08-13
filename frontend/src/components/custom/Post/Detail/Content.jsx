import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostStore } from "@/store/postStore.js";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TableKit } from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import { Placeholder, Selection } from "@tiptap/extensions";
import { generateHTML } from "@tiptap/html";
import { StarterKit } from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

const extensions = [
	StarterKit,
	TextAlign,
	TaskList,
	TaskItem,
	Highlight,
	Image,
	Typography,
	Superscript,
	Subscript,
	Selection,
	ImageUploadNode,
	Placeholder,
	Youtube,
	TableKit,
];

export const Content = () => {
	const post = usePostStore((state) => state?.post);
	const [htmlContent, setHtmlContent] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// setLoading(true);
		if (post) {
			const html = generateHTML(JSON.parse(post?.content), extensions);
			setHtmlContent(html);
			setLoading(false);
		}
	}, [post]);

	return (
		<>
			{/* {!htmlContent || loading ? ( */}
			{/* {!htmlContent ? ( */}
			{!post || !post.content ? (
				<div className="max-w-screen-md w-full pb-16 prose dark:prose-invert border-b-0 flex flex-col gap-3.5">
					{[...Array(12)].map((_, i) => (
						<div
							className="w-full flex flex-col gap-3.5"
							key={i}>
							<Skeleton className="h-4 w-full rounded-full" />
							<Skeleton className="h-4 w-full rounded-full" />
							<Skeleton className="h-4 mb-4 w-4/5 rounded-full" />
						</div>
					))}
				</div>
			) : (
				<div
					className="max-w-screen-md w-full pb-16 prose dark:prose-invert border-none"
					dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
			)}
		</>
	);
};
