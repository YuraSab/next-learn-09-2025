import { Post } from "@/types/Post";

interface Props {
    posts: Post[],
}

const PostList = ({ posts }: Props) => {


    return (
        <div className={"space-y-4"}>
            <h4 className={"text-2xl font-bold mb-4"}>Список постів</h4>
            {
                posts.map((post) => (
                    <div key={post.id} className={"p-4 border border-gray-200 rounded-md"}>
                        <h3 className={"text-tl font-semibold"}>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))
            }
        </div>
    )
}

export  default  PostList;