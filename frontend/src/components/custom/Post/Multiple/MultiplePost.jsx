import {useEffect, useState} from "react";
import SinglePost from "@/components/custom/Post/Single/SinglePost.jsx";

const MultiplePost = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // fetch("https://jsonplaceholder.typicode.com/posts")
        // fetch("https://dummyjson.com/posts")
        fetch("https://jsonfakery.com/blogs/paginated")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res?.status}`)
                }
                return res?.json()
            })
            .then((data) => {
                console.log(data)
                setPosts(data?.data)
            }).catch((error) => {
            console.error("Fetch error: ", error)
        })
    }, []);

    return (
        <div className={"max-w-screen-xl w-full mt-16 mx-auto grid grid-cols-3 gap-y-6 gap-x-4 items-start justify-center"}>

            {posts?.map((post) => (
                <SinglePost post={post} key={post?.id}/>
            ))
            }
        </div>
    );
};

export default MultiplePost;