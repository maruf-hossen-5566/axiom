import {Button} from "@/components/ui/Button";
import {usePostStore} from "@/store/postStore.js";
import {Link} from "react-router-dom";

const PostTags = () => {
    const post = usePostStore(state => state?.post)

    return post && post?.tags?.length > 0 && (
        <div className="w-full py-12 flex items-start justify-start flex-wrap gap-3">
            {post?.tags?.map((tag) => (<Link
                to={`/tag/${tag?.slug}`}
                key={tag?.id}
            >
                <Button className="rounded-full">{tag?.name}</Button>
            </Link>))}
        </div>)

};

export default PostTags;
