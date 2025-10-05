import FeaturedPost from "@/components/custom/Post/Featured/FeaturedPost.jsx";
import MultiplePost from "@/components/custom/Post/Multiple/MultiplePost.jsx";

const Home = () => {
	return (
		<>
			<div className={"py-16"}>
				<div className="px-6 md:px-12">
					<FeaturedPost />
				</div>
				<div className="border-t px-6 md:px-12">
					<MultiplePost />
				</div>
			</div>
		</>
	);
};

export default Home;
