import Link from "next/link";
import { Post } from "@/types/Post";
import Image from "next/image";

interface Props {
    post: Post,
}

const PostItem = ({ post }: Props) => {
    const imageUrl = `https://picsum.photos/400/200?random=${post.id}`;

    return (
        <div className="h-55 p-4 border border-gray-200 rounded-md">
            <Image
                src={imageUrl}
                alt={`Image for post ${post.title}`}
                width={160}
                height={80}
                className={"rounded-md mb-4"}
            />
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.body}</p>
            <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                Read more...
            </Link>
        </div>
    );
};

export default PostItem;