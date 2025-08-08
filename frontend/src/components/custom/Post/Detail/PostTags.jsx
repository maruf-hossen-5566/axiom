import { Button } from "@/components/ui/Button";

const PostTags = () => {
	return (
		<>
			<div className="w-full py-12 flex items-start justify-start flex-wrap gap-3 border-">
				<Button className="rounded-full">Technology</Button>
				<Button className="rounded-full">Python</Button>
				<Button className="rounded-full">Computer Engineering</Button>
				<Button className="rounded-full">Data Science</Button>
			</div>
		</>
	);
};

export default PostTags;
