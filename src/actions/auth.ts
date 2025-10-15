"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

// Чому функції async?
//     Це важливе правило Server Actions.
//     Вимога Server Actions: Усі Server Actions повинні бути async. Next.js перетворює ці функції на API-ендпоінти, і вони завжди повинні повертати Promise.
//     Використання await: Навіть якщо ви не використовуєте await усередині функції (як у випадку з маніпуляціями з куками), вона все одно має бути оголошена як async, щоб відповідати вимогам фреймворку.


// Функція для встановлення сесійної куки
export const setSessionCookie = async (idToken: string) => {
    // 1. Встановлюємо Cookie: Next.js cookies() працює лише в Server/Server Action
    cookies().set('__session', idToken, {
        httpOnly: true, // КРИТИЧНО: Запобігає доступу з Client JavaScript (безпека)
        secure: process.env.NODE_ENV === 'production', // Лише через HTTPS у продакшні
        maxAge: 60 * 60 * 24 * 5, // 5 днів (час життя куки)
        path: '/',
        sameSite: 'lax',
    });
}

// Функція для очищення сесійної куки
export const clearSessionCookie = async () => {
    cookies().delete('__session');
    // Після видалення куки перенаправляємо на сторінку входу.
    redirect('/signin');
}