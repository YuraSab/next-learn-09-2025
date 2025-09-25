import {db} from "@/lib/firebase";
import {collection, getDocs} from "@firebase/firestore";
import {Post} from "@/types/Post";
import useSWR from "swr";

const fetcher = async () => {
    const postCollection = collection(db, 'posts');
    const querySnapshot = await getDocs(postCollection);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.get('userId'),
        title: doc.get('title'),
        body: doc.get('body'),
    })) as Post[];
}


// Створюємо кастомний хук
export const usePosts = () => {
    // Ключем SWR є рядок 'posts-key'. Коли ми оновимо дані,
    // ми будемо використовувати цей ключ для примусової ревалідації
    const { data, error, isLoading, mutate } = useSWR<Post[]>('posts-key', fetcher);

    return {
        posts: data,
        isLoading,
        isError: error,
        mutate,  // Функція для ручної ревалідації (оновлення даних)
    }
}
