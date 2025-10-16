'use server';

import {cookies} from "next/headers";
import {adminAuth} from "@/lib/firebaseAdmin";

/**
 * Верифікує токен сесії (з куки) і повертає UID користувача.
 */
export async function getAuthenticatedServerUID(): Promise<string | null> {

    const cookiesList = cookies();
    // const sessionCookie = cookies().get('__session')?.value;
    const sessionCookie = cookiesList.get('__session')?.value;


    if (!sessionCookie)
        return null;

    try {
        // Верифікація токена: ПЕРЕВІРЯЄ, чи токен дійсний та виданий Firebase
        const decodedClaims = await adminAuth.verifyIdToken(sessionCookie, true);
        return decodedClaims.uid;
    } catch (error) {
        // Токен недійсний, прострочений або підроблений
        console.error("Failed to verify session cookie:", error);
        return null;
    }
}