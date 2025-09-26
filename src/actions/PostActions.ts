"use server";

import {revalidatePath} from "next/cache";
import {collection, addDoc, deleteDoc, type DocumentData, CollectionReference, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {doc} from "firebase/firestore";
import {Comment} from "@/types/Comment";

// revalidatePath('/'): Це та сама On-demand Revalidation, про яку ми говорили.
// Коли ми успішно додаємо пост, ця функція повідомляє Next.js, що кеш для маршруту / потрібно оновити.
// Це гарантує, що наступний запит до головної сторінки отримає оновлений список постів.

interface PostBody {
    userId: string;
    title: string;
    body: string;
    createdAt: string;
}

export const addPost = async (formData: FormData) => {
    const newPost = {
        userId: formData.get("userId") as string,
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        createdAt: new Date().toISOString(), // Додамо дату створення
    };

    try {
        const postCollection = collection(db, 'posts') as CollectionReference<PostBody, DocumentData>;
        await addDoc(postCollection, newPost);
        // On-demand Revalidation: оновлюємо кеш для головної сторінки
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error('Error in Server Action:', error);
        return { error: 'Failed to create post.' };
    }
}


export const deletePost = async (id: string) => {
    try {
        const ref = doc(db, 'posts', id)
        await deleteDoc(ref);
        // On-demand Revalidation: оновлюємо кеш
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
        const postRef = doc(db, 'posts', postId);
        // @ts-ignore
        await updateDoc(postRef, updatedPost);
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