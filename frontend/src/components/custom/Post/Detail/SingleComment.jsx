import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SingleComment = ({ comment }) => {
	return (
		<>
			<div className="w-full py-8 flex items-start gap-2">
				<Avatar className="size-6">
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt={comment?.user?.username}
					/>
					<AvatarFallback>
						{comment?.user?.fullName[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="w-full ">
					<div className="w-full flex items-start justify-between gap-4">
						<div className="w-full flex flex-col">
							<p className="text-sm font-medium">
								{comment?.user?.fullName}
							</p>
							<p className="text-xs text-muted-foreground">
								5 days ago
							</p>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="size-6 rounded-full">
									<Ellipsis />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56 z-[500]"
								align="end">
								<DropdownMenuItem
									onClick={(e) => e.preventDefault()}>
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem
									variant="destructive"
									onClick={(e) => e.preventDefault()}>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<p className="text-sm mt-2">{comment?.body}</p>
				</div>
			</div>
		</>
	);
};
