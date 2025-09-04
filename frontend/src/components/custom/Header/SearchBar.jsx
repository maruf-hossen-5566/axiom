import { Input } from "@/components/ui/input.jsx";
import { Hash, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { search_data } from "@/api/searchApi.js";
import { useDebounce } from "use-debounce";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar.jsx";
import { Image } from "@tiptap/extension-image";
import { Separator } from "@/components/ui/separator.jsx";
import pluralize from "pluralize";

const SearchBar = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [open, setOpen] = useState(false);
	const [searchResult, setSearchResult] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get("query") || "";
	const [debouncedQuery] = useDebounce(searchQuery, 300);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);

		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const search = async () => {
			setLoading(true);
			try {
				const res = await search_data({ query: searchQuery });
				setSearchResult(res?.data);
			} catch (error) {
				console.log("Failed search error: ", error);
				toast.error(
					error?.response?.data?.detail ||
						`Failed to search for "${searchQuery}".`
				);
			}
			setLoading(false);
		};

		if (searchQuery?.trim()) {
			search();
		} else {
			setSearchResult(null);
		}
	}, [debouncedQuery]);

	const updateSearchParams = (value) => {
		searchParams.set("query", value);
		setSearchParams(searchParams);
	};

	return (
		<>
			<Button
				className="max-md:size-9 max-md:!p-0 w-max flex items-center justify-start max-md:justify-center gap-0 rounded-full md:border text-muted-foreground"
				variant={windowWidth > 768 ? "outline" : "ghost"}
				onClick={() => setOpen(!open)}>
				{<Search className="max-md:!self-center" />}
				<Input
					type="text"
					placeholder="Search"
					className="max-md:!hidden pl-2 !w-auto border-none outline-none !bg-transparent pointer-events-none"
					value={searchQuery}
					onChange={(e) => console.log("Value: ", e.target.value)}
				/>
			</Button>

			<CommandDialog
				commandProps={{ shouldFilter: false }}
				showCloseButton={false}
				open={open}
				onOpenChange={setOpen}
				className="bg-transparent sm:max-w-2xl gap-1 !w-full z-[100] border-none shadow-md translate-y-0 top-[15%]">
				<CommandInput
					type="text"
					placeholder="Search..."
					value={searchQuery?.trimStart()}
					onValueChange={updateSearchParams}
				/>

				{searchResult && (
					<CommandList className="mt-1 max-h-96">
						{loading ? (
							<div className="w-full px-4 py-12 flex items-center justify-center pointer-events-none">
								<Loader2 className="animate-spin" />
							</div>
						) : (
							<>
								{searchResult?.posts && (
									<>
										<CommandGroup
											heading="POSTS"
											className="!py-2">
											{searchResult?.posts?.map(
												(post) => (
													<CommandItem
														key={post?.id}
														value={post?.title}
														onSelect={() => {
															navigate(
																`/${post?.author?.username}/${post?.slug}`
															);
															setOpen(false);
														}}>
														<div className="w-full flex items-center justify-start gap-4">
															<img
																loading="lazy"
																src={
																	post
																		?.thumbnail
																		?.image ||
																	"https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
																}
																alt="Photo by Drew Beamer"
																className="rounded-sm w-36 aspect-video object-center object-cover"
															/>
															<div className="w-full flex flex-col gap-2">
																<p className="text-base leading-snug font-medium line-clamp-2">
																	{
																		post?.title
																	}
																</p>
																<p className="w-full flex items-center gap-1.5">
																	<Avatar className="size-5">
																		<AvatarImage
																			src={
																				post
																					?.author
																					?.avatar ||
																				"https://github.com/shadcn.png"
																			}
																		/>
																		<AvatarFallback>
																			{post?.author?.full_name
																				?.toUpperCase()
																				.charAt(
																					0
																				)}
																		</AvatarFallback>
																	</Avatar>
																	{
																		post
																			?.author
																			?.full_name
																	}
																</p>
															</div>
														</div>
													</CommandItem>
												)
											)}
										</CommandGroup>
										<Separator />
									</>
								)}
								{searchResult?.users && (
									<CommandGroup
										heading="USERS"
										className="!py-2">
										{searchResult?.users?.map((user) => (
											<CommandItem
												key={user?.id}
												value={user?.full_name}
												onSelect={() => {
													navigate(
														`/${user?.username}`
													);
													setOpen(false);
												}}>
												<div className="w-full flex items-center justify-start gap-2.5">
													<Avatar className="size-12">
														<AvatarImage
															src={
																user?.avatar ||
																"https://github.com/shadcn.png"
															}
														/>
														<AvatarFallback>
															{user?.full_name
																?.toUpperCase()
																.charAt(0)}
														</AvatarFallback>
													</Avatar>
													<div className="w-full text-sm flex flex-col items-start justify-center">
														<p className="font-medium">
															{user?.full_name}
														</p>
														<p className="text-muted-foreground">
															@{user?.username}
														</p>
													</div>
												</div>
											</CommandItem>
										))}
									</CommandGroup>
								)}
								{searchResult?.tags && (
									<>
										<Separator />
										<CommandGroup
											heading="TAGS"
											className="!py-2">
											{searchResult?.tags?.map((tag) => (
												<CommandItem
													key={tag?.id}
													value={tag?.name}>
													<div className="w-full flex items-center justify-start gap-2.5">
														<div className="w-full text-sm flex items-center justify-start gap-3">
															<div className="size-7 shrink-0 flex items-center justify-center">
																<Hash className="!size-full" />
															</div>
															<div className="w-full flex flex-col items-start justify-center">
																<p className="font-medium">
																	{tag?.name}
																</p>
																<div className="w-full flex items-center gap-2">
																	<p className="text-muted-foreground">
																		#
																		{
																			tag?.slug
																		}
																	</p>
																	<Separator
																		orientation="vertical"
																		className="!h-3"
																	/>
																	<p className="text-muted-foreground">
																		{
																			tag?.post_count
																		}{" "}
																		{pluralize(
																			"post",
																			tag?.post_count
																		)}
																	</p>
																</div>
															</div>
														</div>
													</div>
												</CommandItem>
											))}
										</CommandGroup>
									</>
								)}
								{(searchResult?.posts ||
									searchResult?.users ||
									searchResult?.tags) && (
									<div className="w-full py-5 flex justify-center border-t">
										<Button
											variant="outline"
											className="self-center rounded-full">
											See all results
										</Button>
									</div>
								)}
								<CommandEmpty>No results found.</CommandEmpty>
							</>
						)}
					</CommandList>
				)}
			</CommandDialog>
		</>
	);
};

export default SearchBar;
