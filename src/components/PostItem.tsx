import Link from "next/link";
import { Post } from "@/types/Post";

interface Props {
    post: Post,
}

const PostItem = ({ post }: Props) => {
    return (
        <div className="h-35 p-4 border border-gray-200 rounded-md">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.body}</p>
            <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                Read more...
            </Link>
        </div>
    );
};

export default PostItem;