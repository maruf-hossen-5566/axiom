import FeaturedPost from "@/components/custom/Post/Featured/FeaturedPost.jsx";
import MultiplePost from "@/components/custom/Post/Multiple/MultiplePost.jsx";

const Home = () => {
    return (
        <>
            <div className={"py-16"}>
                <div className="">
                    <FeaturedPost/>
                </div>
                <div className="border-t">
                    <MultiplePost/>
                </div>
            </div>
        </>
    );
};

export default Home;