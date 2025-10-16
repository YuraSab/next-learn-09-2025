"use server";

import {revalidatePath} from "next/cache";
import {collection, addDoc, deleteDoc, type DocumentData, CollectionReference, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {doc, getDoc} from "firebase/firestore";
import {Comment} from "@/types/Comment";
import {getAuthenticatedServerUID} from "@/lib/serverAuth";
import {notFound} from "next/navigation";
import {Post} from "@/types/Post";
import {adminDB} from "@/lib/firebaseAdmin";

// revalidatePath('/'): Це та сама On-demand Revalidation, про яку ми говорили.
// Коли ми успішно додаємо пост, ця функція повідомляє Next.js, що кеш для маршруту / потрібно оновити.
// Це гарантує, що наступний запит до головної сторінки отримає оновлений список постів.

interface PostBody {
    userId: string;
    title: string;
    body: string;
    createdAt: string;
}

interface FormState {
    message: string,
}

// Перший виклик: При першому рендерингу prevState є початковим значенням, яке ви передали у хук (initialState).
// Наступні виклики: Після першої відправки форми, prevState — це попереднє значення стану, яке повернув ваш Server Action.
// У вашому простому прикладі addPost ви просто повертаєте нове повідомлення.
// Однак, якщо ваш стан був би складним об'єктом (наприклад, містив список помилок валідації або проміжних результатів), ви могли б використовувати prevState для поступового оновлення стану без втрати попередньої інформації.
// Навіть якщо ви його не використовуєте, він повинен бути присутнім у сигнатурі функції, щоб Next.js знав, як правильно зв'язати Server Action з хуком useActionState.
export const addPost = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const uid = await getAuthenticatedServerUID();

    // 1. ПЕРЕВІРКА АВТЕНТИФІКАЦІЇ
    if (!uid) {
        return { message: 'Помилка: Ви повинні бути авторизовані для додавання постів.' };
    }

    const newPost = {
        userId: uid, // 2. ЗАПИСУЄМО РЕАЛЬНИЙ UID
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        createdAt: new Date().toISOString(), // Додамо дату створення
    };

    if (newPost.title.length < 5 || newPost.body.length < 10) {
        return { message: 'Помилка: Заголовок має бути не менше 5, а тіло - 10 символів.' };
    }

    try {
        const postCollection = collection(db, 'posts') as CollectionReference<PostBody, DocumentData>;
        await addDoc(postCollection, newPost);
        // On-demand Revalidation: оновлюємо кеш для головної сторінки
        revalidatePath("/");
        // return { success: true };
        return { message: 'Пост успішно додано!' };
    } catch (error) {
        console.error('Error in Server Action:', error);
        // return { error: 'Failed to create post.' };
        return { message: 'Помилка сервера: Не вдалося додати пост.' };
    }
}

const doesUserHavePermissionForPost = async (postId): Promise<boolean> => {
    const uid = await getAuthenticatedServerUID();

    if (!uid)
        return false;

    try {
        // const docRef = await doc(db, 'posts', postId)
        // const docSnap = await getDoc(docRef);

        // Використовуємо AdminDB (повні права)
        const docSnap = await adminDB.collection('posts').doc(postId).get();

        // if (!docSnap.exists())
        //     return false;

        const postData = docSnap.data() as Post;

        return postData?.userId == uid;
    } catch (error) {
        console.error('Error in Server Action:', error);
        return false;
    }
}

export const deletePost = async (id: string) => {
    try {
        if ( !await doesUserHavePermissionForPost(id) )
            return { message: 'Помилка: Ви не маєте доступу до видалення даного поста.' };

        // Видалення також краще робити через AdminDB
        // const docRef = await doc(db, 'posts', id)
        // await deleteDoc(docRef);

        await adminDB.collection('posts').doc(id).delete();

        // // On-demand Revalidation: оновлюємо кеш
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error in Server Action:', error);
        return { error: 'Failed to delete post.' };
    }
}


export const updatePost = async (formData: FormData) => {
    const postId = formData.get('id') as string;
    const updatedPost = {
        title: formData.get('title') as string,
        body: formData.get('body') as string,
        updatedAt: new Date().toISOString(),
    };

    try {
        if ( !await doesUserHavePermissionForPost(postId) )
            return { message: 'Помилка: Ви не маєте доступу до видалення даного поста.' };

        // Редагування також через AdminDB
        // const docRef = await doc(db, 'posts', postId)
        // @ts-ignore
        // await updateDoc(docRef, updatedPost);
        await adminDB.collection('posts').doc(postId).update(updatedPost);

        revalidatePath(`/posts/${postId}`);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error in Server Action:', error);
        return { error: 'Failed to update post.' };
    }
}

interface CommentBody {
    author: string,
    text: string,
    createdAt: string,
}


export const addComment = async ( formData: FormData ) => {
    const postId = formData.get('postId') as string;
    // Якщо ми додаємо коментар, ми повинні знати, до якого поста він належить.
    if (!postId)
        return { error: 'Post ID is missing.' };

    const newComment: CommentBody = {
        author: 'Anonymous user', // Заглушка, поки не додамо Auth
        text: formData.get('text') as string,
        createdAt: new Date().toISOString(),
    };

    try {
        // Шлях: /posts/{postId}/comments
        const commentRef = collection(db, 'posts', postId, 'comments') as CollectionReference<CommentBody>;
        await addDoc(commentRef, newComment);
        // Примітка: Нам НЕ потрібен revalidatePath тут,
        // оскільки onSnapshot автоматично оновить клієнт!
        return { success: true };
    } catch (error) {
        console.error('Error adding comment:', error);
        return { error: 'Failed to add comment.' };
    }
}