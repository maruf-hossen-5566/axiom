import { Button } from "@/components/ui/Button";
import { Bookmark, Ellipsis, Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";
import Comments from "./Comments";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

const Engagement = () => {
	const [liked, setLiked] = useState(true);
	const [bookmarked, setBookmarked] = useState(false);

	return (
		<>
			<div className="bg-background block w-full border- py-4 px-1">
				<div
					className="flex items-center justify-start gap-2
                ">
					<Button
						variant="ghost"
						className="text-xs rounded-full cursor-pointer"
						onClick={() => setLiked(!liked)}>
						<>
							<Heart fill={liked && "currentColor"} />
							34K
						</>
					</Button>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								className="text-xs rounded-full cursor-pointer">
								<>
									<MessageCircle />
									1.9K
								</>
							</Button>
						</SheetTrigger>
						<Comments />
					</Sheet>
					<Button
						size={bookmarked ? "icon" : ""}
						variant="ghost"
						className="text-xs ml-auto rounded-full cursor-pointer"
						onClick={() => setBookmarked(!bookmarked)}>
						<>
							<Bookmark fill={bookmarked ? "currentColor" : ""} />
							{!bookmarked && "Bookmark"}
						</>
					</Button>
					<Button
						variant="ghost"
						className="text-xs rounded-full cursor-pointer">
						<>
							<Share /> Share
						</>
					</Button>
					<Button
						size="icon"
						variant="ghost"
						className="text-xs rounded-full cursor-pointer">
						<Ellipsis />
					</Button>
				</div>
			</div>
		</>
	);
};

export default Engagement;
