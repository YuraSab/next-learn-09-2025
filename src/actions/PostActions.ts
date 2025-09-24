"use server";

import {revalidatePath} from "next/cache";
import {collection, addDoc, deleteDoc, type DocumentData, CollectionReference, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {doc} from "firebase/firestore";

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