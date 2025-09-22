import {Post} from "@/types/Post";
import PostItem from "@/components/PostItem";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "@/lib/firebase";

interface FirestorePost {
    title: string;
    body: string;
    userId: number;
}

const PostList = async () => {
    // Отримуємо посилання на колекцію 'posts'
    const postCollection = collection(db, 'posts');
    // Отримуємо всі документи з колекції
    const querySnapshot = await getDocs(postCollection);

    const posts: Post[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as FirestorePost;
        return {
            id: doc.id,
            title: data.title,
            body: data.body,
            userId: data.userId,
        };
    });


    // Обрізаємо список до перших 10 постів для демонстрації
    const firstTen = posts.slice(0, 10);

    return (
        <div className={"space-y-4 w-full"}> {/* Додано клас w-full */}
            <h4 className={"text-2xl font-bold mb-4"}>Post list</h4>
            {
                firstTen.map((post, key) => <PostItem post={post} key={post.id}/>)
            }
        </div>
    )
}

export default PostList;