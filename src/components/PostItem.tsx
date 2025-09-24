'use client'

import Link from "next/link";
import { Post } from "@/types/Post";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {deletePost} from "@/actions/PostActions";

interface Props {
    post: Post,
}

const PostItem = ({ post }: Props) => {
    const router = useRouter();
    const imageUrl = `https://picsum.photos/400/200?random=${post.id}`;

    const handleDelete = async () => {
        if ( confirm('Are you sure you wanna delete this post?') ) {
            await deletePost(post.id);
            // Оновлюємо сторінку після видалення
            router.refresh();
        }
    }

    return (
        <div className={"h-75 p-4 border border-gray-200 rounded-md relative"}>
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
            >
                &#x2715; {/* Хрестик для видалення */}
            </button>
            <Image
                src={imageUrl}
                alt={`Зображення для поста ${post.title}`}
                width={300}
                height={150}
                className="rounded-t-md mb-4"
            />
            <h3 className={"text-xl font-semibold"}>{post.title}</h3>
            <p>{post.body}</p>
            <Link href={`/posts/${post.id}`} className={"text-blue-500 hover:underline mt-2 inline-block"}>
                Read more...
            </Link>
        </div>
    );
};

export default PostItem;