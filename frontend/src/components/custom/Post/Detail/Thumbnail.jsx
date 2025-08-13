import { usePostStore } from "@/store/postStore.js";

const Thumbnail = () => {
	const post = usePostStore((state) => state?.post);

	return (
		post?.thumbnail && (
			<div className="lg:max-w-screen-md w-full mx-auto pt-6 lg:px-12 ">
				<img
					src={
						post?.thumbnail?.image ||
						"https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
					alt="Thumbnail"
					className={
						"aspect-video size-full object-center object-cover"
					}
				/>
			</div>
		)
	);
};

export default Thumbnail;
