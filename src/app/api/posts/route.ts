// Цей файл src/app/api/posts/route.ts буде відповідати за маршрут /api/posts.

import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const { title, body } = await request.json();
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body, userId: 1 }),
        });
        if (!response.ok)
            throw new Error('Failed to create post via API');

        // On-demand Revalidation: оновлюємо кеш для головної сторінки
        revalidatePath('/');

        // Повертаємо успішну відповідь
        return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });

    } catch (error) {
        console.error('Error in API Route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}