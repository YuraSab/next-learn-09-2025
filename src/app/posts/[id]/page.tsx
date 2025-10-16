import {Params} from "@/types/Global";
import {Post} from "@/types/Post";
import {db} from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import {notFound} from "next/navigation";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import {Metadata} from "next";

interface  Props {
    params: Params,
}

export const getPostById = async (id: string): Promise<Post> => {
    // Отримуємо посилання на один конкретний документ
    const docRef = await doc(db, 'posts', id);
    // Отримуємо сам документ
    const docSnap = await getDoc(docRef);
    // Перевіряємо, чи існує документ
    if (! docSnap.exists())
        notFound(); // Якщо поста не існує, відображаємо сторінку 404

    const postData = docSnap.data() as Post;
    return {
        id: (await docSnap).id,
        title: postData.title,
        body: postData.body,
        userId: postData.userId
    };
}

// 1. Асинхронна функція generateMetadata
// Вона отримує props (включаючи параметри маршруту)
export async function generateMetadata({ params }: Props ): Promise<Metadata> {
    const {id} = await params;
    const post = await getPostById(id);
    // Якщо пост не знайдено, повертаємо загальні метадані
    if (!post) {
        return {
            title: 'Пост не знайдено',
            description: 'Вибачте, запитуваний контент не існує.',
        };
    }
    // 2. Повернення динамічних метаданих
    return {
        title: post.title,
        description: post.body.substring(0, 150) + '...', // Беремо частину тексту
        keywords: ['Next.js', 'Firebase', post.title],
        openGraph: { // Open Graph для соціальних мереж
            title: post.title,
            description: post.body.substring(0, 150) + '...',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${params.id}`,
            siteName: 'My Next.js Blog',
            // images: [
            //   {
            //     url: post.imageUrl || '/default-image.jpg', // Якщо є зображення для поста
            //     width: 800,
            //     height: 600,
            //   },
            // ],
        },
    };
}
const PostPage = async ({ params }: Props) => {
    const {id} = await params;
    const post = await getPostById(id);

    return (
        <div className={"flex min-h-screen flex-col items-center p-24"}>
            <div className={"p-8 border border-gray-300 rounded-lg shadow-md"}>
                <h1 className={"text-3xl font-bold mb-4"}>{post.title}</h1>
                <p className={"text-lg text-gray-700"}>{post.body}</p>
            </div>
            <Link href={`/posts/edit/${post.id}`}>
                Edit post
            </Link>
            <CommentSection postId={post.id}/>
        </div>
    )
}

export  default  PostPage;