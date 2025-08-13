import BackButton from "@/components/custom/Post/New/BackButton.jsx";
import PublishButton from "@/components/custom/Post/New/PublishButton.jsx";

const EditorHeader = () => {
	return (
		<div
			className={
				"w-full xs:!hidden flex justify-between sticky bg-background top-0 z-50 py-4 px-4 border-b"
			}>
			<BackButton />
			<PublishButton />
		</div>
	);
};

export default EditorHeader;
