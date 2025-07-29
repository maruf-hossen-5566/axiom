import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import moment from "moment/moment.js";


const SinglePost = ({post}) => {
    return (<Card
        className={"w-full h-full col-span-1 bg-transparent hover:bg-accent dark:hover:bg-card border-none gap-0 shadow-none"}>
        <CardHeader>
            <div className="aspect-video w-full mb-2">
                <img
                    loading="lazy"
                    src={ post?.featured_image ||"https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"}
                    alt="Photo by Drew Beamer"
                    className="rounded-sm w-full h-full object-cover"
                />
            </div>
            <div className="w-full py-1 text-xs flex text-muted-foreground items-center justify-start">
                {/*<p>{moment(post?.created_at, "ddd, M/D/YYYY").format("MMM D, YYYY")}</p>*/}
                <p>{moment(post?.created_at, "ddd, M/D/YYYY").format("MMM D, YYYY")}</p>
                <p className={"size-[5px] bg-accent rounded-full mx-2"}></p>
                <p>5 min read</p>
            </div>
        </CardHeader>

        <CardContent>
            <div className="w-full">
                <CardTitle
                    className={"capitalize mt-1 text-lg font-medium font-inter leading-snug line-clamp-2"}>{post?.title}</CardTitle>
                <CardDescription
                    className={"mt-1.5 font-inter leading-normal line-clamp-2"}>{post?.summary}</CardDescription>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <p className={"text-sm hover:underline"}>By {`${post?.user?.first_name} ${post?.user?.last_name}`}</p>
            </div>
        </CardContent>
    </Card>);
};

export default SinglePost;
