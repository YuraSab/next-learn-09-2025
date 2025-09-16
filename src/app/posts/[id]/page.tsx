import {Params} from "@/types/Global";
import {Post} from "@/types/Post";

interface  Props {
    params: Params,
}

const PostPage = async ({ params }: Props) => {
    const {id} = await params;

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post: Post = await response.json();

    // Обробка, якщо пост не знайдено (хоча JSONPlaceholder завжди повертає об'єкт)
    if ( !post || Object.keys(post).length === 0 )
        return <div>No post found!</div>;

    return (
        <div className={"flex min-h-screen flex-col items-center p-24"}>
            <div className={"p-8 border border-gray-300 rounded-lg shadow-md"}>
                <h1 className={"text-3xl font-bold mb-4"}>{post.title}</h1>
                <p className={"text-lg text-gray-700"}>{post.body}</p>
            </div>
        </div>
    )
}

export  default  PostPage;