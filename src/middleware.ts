import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

import {cookies} from "next/headers";

const PROTECTED_ROUTES = [
    '/posts/new',
    '/profile',
];

const AUTH_ROUTES = [
    '/signin',
    '/signup',
];

export function middleware (request: NextRequest) {
    console.log(`middleware just have worked!. Url: ${request.nextUrl.pathname}`);
    const sessionToken = request.cookies.get('__session' as any)?.value;
    const pathname = request.nextUrl.pathname;

    // 1. ЗАХИСТ ПРИВАТНИХ МАРШРУТІВ
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !sessionToken) {
        // Якщо маршрут захищений І куки немає -> редирект на вхід
        const url = request.nextUrl.clone();
        url.pathname = '/signin';
        return NextResponse.redirect(url);
    }

    // 2. ЗАХИСТ СТОРІНОК ВХОДУ/РЕЄСТРАЦІЇ
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    if (isAuthRoute && sessionToken) {
        // Якщо користувач має куку (залогінений) І намагається зайти на /signin -> редирект на головну
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    // Виконуємо Middleware на всіх запитах, крім статичних файлів та API
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};