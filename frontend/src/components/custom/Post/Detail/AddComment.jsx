import { Button } from "@/components/ui/button";

const AddComment = ({
	updateCommentText,
	setUpdateCommentText,
	handleUpdate,
	loading,
	commentObj,
	setUpdatingComment,
}) => {
	return (
		<div className="w-full flex flex-col items-center justify-start gap-3">
			<textarea
				placeholder="Write your comment..."
				rows="5"
				className="w-full py-2 px-3 text-sm bg-input/30 border border-input outline-none rounded-sm resize-none"
				onChange={(e) => setUpdateCommentText(e.target?.value)}
				value={updateCommentText}></textarea>
			<div className="w-full flex items-center justify-between gap-2">
				<Button
					variant="ghost"
					size="sm"
					className="rounded-full"
					onClick={() => setUpdatingComment(false)}>
					Cancel
				</Button>
				<Button
					onClick={handleUpdate}
					size="sm"
					className="rounded-full"
					disabled={
						loading ||
						!updateCommentText?.trim() ||
						updateCommentText?.trim() === commentObj?.content
					}>
					Confirm
				</Button>
			</div>
		</div>
	);
};

export default AddComment;
