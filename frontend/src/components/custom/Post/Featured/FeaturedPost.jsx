import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {useEffect, useState} from "react";
import moment from "moment/moment.js";

const FeaturedPost = () => {
    const [posts, setPosts] = useState([])
    let post = {}

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

    if (posts) {
        post = posts[0]
    }

    return (
        <>
            <Card
                className={"w-full h-full max-w-screen-xl mb-16 mx-auto grid grid-cols-7 items-start justify-center bg-transparent hover:bg-accent dark:hover:bg-card border-none gap-0 shadow-none cursor-pointer"}
            >
                <CardHeader className={"col-span-3"}>
                    <div className="aspect-video w-full">
                        <img
                            loading="lazy"
                            src={post?.featured_image || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"}
                            alt="Photo by Drew Beamer"
                            className="rounded-sm w-full h-full object-cover"
                        />
                    </div>
                </CardHeader>

                <CardContent className={"col-span-4 self-center"}>
                    <div className="w-full pb-1.5 text-[13px] flex text-muted-foreground items-center justify-start">
                        <p>{moment(post?.created_at, "ddd, M/D/YYYY").format("MMM D, YYYY")}</p>
                        <p className={"size-[5px] bg-accent rounded-full mx-2"}></p>
                        <p>5 min read</p>
                    </div>
                    <div className="w-full">
                        <CardTitle
                            className={"capitalize mt-1 text-xl font-normal font-inter line-clamp-2"}
                        >{post?.subtitle}</CardTitle>
                        <CardDescription
                            className={"mt-1.5 text-sm font-inter leading-relaxe line-clamp-3"}
                        >{post?.summary}</CardDescription>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <Avatar className={"size-5"}>
                            <AvatarImage
                                // src="https://github.com/evilrabbit.png"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="@evilrabbit"
                            />
                            <AvatarFallback>{post?.user?.first_name[0] || "A"}</AvatarFallback>
                        </Avatar>
                        <p className={"text-sm font-normal hover:underline"}>{`${post?.user?.first_name} ${post?.user?.last_name}`}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default FeaturedPost;