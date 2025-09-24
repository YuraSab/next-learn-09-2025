import {Params} from "@/types/Global";
import {Post} from "@/types/Post";
import {db} from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import {notFound} from "next/navigation";
import Link from "next/link";

interface  Props {
    params: Params,
}

const PostPage = async ({ params }: Props) => {
    const {id} = await params;

    // Отримуємо посилання на один конкретний документ
    const docRef = doc(db, 'posts', id);
    // Отримуємо сам документ
    const docSnap = await getDoc(docRef);
    // Перевіряємо, чи існує документ
    if (! docSnap.exists())
        notFound(); // Якщо поста не існує, відображаємо сторінку 404

    const postData = docSnap.data() as Post;
    const post: Post = {
        id: (await docSnap).id,
        title: postData.title,
        body: postData.body,
        userId: postData.userId
    };

    return (
        <div className={"flex min-h-screen flex-col items-center p-24"}>
            <div className={"p-8 border border-gray-300 rounded-lg shadow-md"}>
                <h1 className={"text-3xl font-bold mb-4"}>{post.title}</h1>
                <p className={"text-lg text-gray-700"}>{post.body}</p>
            </div>
            <Link href={`/posts/edit/${post.id}`}>
                Edit post
            </Link>
        </div>
    )
}

export  default  PostPage;