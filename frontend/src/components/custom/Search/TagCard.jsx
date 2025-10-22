import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Hash } from "lucide-react";
import pluralize from "pluralize";
import { Link } from "react-router-dom";

const TagCard = ({ tag }) => {
	return (
		<div className="w-full block mx-auto">
			<Card className="w-full h-full max-w-screen-xl mx-auto flex flex-col items-start bg-sidebar dark:bg-card gap-0">
				<CardHeader
					className={"w-full flex items-center justify-start gap-2"}>
					<Link to={`/tag/${tag?.slug}`}>
						<div
							className={
								"size-10 p-1.5 bg-accent flex items-center justify-center rounded-md"
							}>
							{tag?.logo_url ? (
								<img
									src={tag?.logo_url}
									alt={tag?.name}
									className="rounded"
								/>
							) : (
								<Hash className="text-muted-foreground" />
							)}
						</div>
					</Link>
					<Link
						to={`/tag/${tag?.slug}`}
						className="flex flex-col justify-center group overflow-hidden">
						<p className="group-hover:underline whitespace-nowrap">{`${tag?.name}`}</p>
						<p className="text-sm -mt-1 text-muted-foreground group-hover:underline whitespace-nowrap">
							#{`${tag?.slug}`}
						</p>
					</Link>
				</CardHeader>

				<CardContent className="mt-6 w-full flex items-end justify-start gap-2">
					<p className="text-sm text-muted-foreground">
						{tag?.post_count} {pluralize("post", tag?.post_count)}
					</p>
					<div className="size-1 my-auto mx-1 rounded-full bg-accent" />
					<p className="text-sm text-muted-foreground">
						{tag?.post_count}{" "}
						{pluralize("follower", tag?.post_count)}
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default TagCard;
