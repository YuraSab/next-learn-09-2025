import Link from "next/link";
import {Post} from "@/types/Post";

const PostList = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await  response.json();
    // Обрізаємо список до перших 10 постів для демонстрації
    const firstTen = posts.slice(0, 10);

    return (
        <div className={"space-y-4"}>
            <h4 className={"text-2xl font-bold mb-4"}>Post list</h4>
            {
                posts.map((post) => (
                    <div key={post.id} className={"p-4 border border-gray-200 rounded-md"}>
                        <h3 className={"text-tl font-semibold"}>{post.title}</h3>
                        <p>{post.body}</p>
                        <Link href={`/posts/${post.id}`} className={"text-blue-500 hover:underline mt-2 inline-block"}>
                            Read more...
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export  default  PostList;