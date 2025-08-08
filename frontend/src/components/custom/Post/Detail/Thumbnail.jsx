const Thumbnail = ({ thumbnail }) => {
	return (
		<div className="lg:max-w-screen-md w-full mx-auto pt-6 lg:px-12 ">
			<img
				src={
					thumbnail?.image ||
					"https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				}
				alt="Thumbnail"
				className={"aspect-video size-full object-center object-cover"}
			/>
		</div>
	);
};

export default Thumbnail;
