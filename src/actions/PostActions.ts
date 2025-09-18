"use server";

import {revalidatePath} from "next/cache";

// revalidatePath('/'): Це та сама On-demand Revalidation, про яку ми говорили.
// Коли ми успішно додаємо пост, ця функція повідомляє Next.js, що кеш для маршруту / потрібно оновити.
// Це гарантує, що наступний запит до головної сторінки отримає оновлений список постів.

export const AddPost = async (formData: FormData) => {
    const newPost = {
        userId: formData.get("userId"),
        title: formData.get("title"),
        body: formData.get("body")
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost)
        });

        if (!response.ok)
            throw new Error('Failed to create post');

        // On-demand Revalidation: оновлюємо кеш для головної сторінки
        revalidatePath("/");
    } catch (error) {
        console.error('Error in Server Action:', error);
    }

}
