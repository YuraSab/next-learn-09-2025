import {Post} from "@/types/Post";
import PostItem from "@/components/PostItem";

const PostList = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await  response.json();
    // Обрізаємо список до перших 10 постів для демонстрації
    const firstTen = posts.slice(0, 10);

    return (
        <div className={"space-y-4 w-full"}> {/* Додано клас w-full */}
            <h4 className={"text-2xl font-bold mb-4"}>Post list</h4>
            {
                firstTen.map((post) => <PostItem post={post} key={post.id}/>)
            }
        </div>
    )
}

export default PostList;