const Title = ({ title }) => {
	return (
		<div className={"max-w-screen-md w-full mx-auto py-6 border-none"}>
			<h1 className={"w-full text-3xl font-bold"}>{title}</h1>
		</div>
	);
};

export default Title;
