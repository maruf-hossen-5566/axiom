import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { usePostStore } from "@/store/postStore.js";
import { Skeleton } from "@/components/ui/skeleton";

const BackButton = ({ title, to = "/", loading = false }) => {
	return (
		<>
			{loading ? (
				<Skeleton
					className={`h-9 w-20 rounded-full ${!title && "w-9"}`}
				/>
			) : (
				<>
					<Button
						asChild
						variant={"ghost"}
						className={
							"!p-2 rounded-full accent-accent cursor-pointer"
						}
						size={!title ? "icon" : "none"}>
						<Link to={to}>
							<>
								{/*<ChevronLeft/>*/}
								<ArrowLeft />
								{title && title}
							</>
						</Link>
					</Button>
				</>
			)}
		</>
	);
};

export default BackButton;
