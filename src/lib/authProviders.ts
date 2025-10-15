// src/lib/authProviders.ts
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    AuthCredential,
    linkWithCredential
} from "firebase/auth";
import { auth } from "./firebase";
import { setSessionCookie } from "@/actions/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/**
 * Загальна функція для входу за допомогою спливаючого вікна
 * @param provider - Об'єкт провайдера (GoogleAuthProvider | GithubAuthProvider)
 */
const signInWithSocialProvider = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    try {
        const result = await signInWithPopup(auth, provider);
        // ********************
        // УСПІШНИЙ ВХІД
        // ********************

        // Отримання ID токена
        const idToken = await result.user.getIdToken();

        // Передача токена на Server Action для встановлення httpOnly куки
        await setSessionCookie(idToken);

        return { success: true };

    } catch (error: any) {
        // 1. ПЕРЕВІРКА НА КОНФЛІКТ ОБЛІКОВИХ ЗАПИСІВ
        if (error.code === 'auth/account-exists-with-different-credential') {

            // Якщо користувач вже має сесію (тобто, він залогінений)
            if (auth.currentUser) {
                const pendingCredential = error.credential as AuthCredential;

                try {
                    // СПРОБА ЗВ'ЯЗУВАННЯ: Якщо користувач вже в системі, зв'язуємо новий провайдер
                    await linkWithCredential(auth.currentUser, pendingCredential);

                    // Зв'язування успішне. Повторно отримуємо токен (з новим провайдером)
                    const idToken = await auth.currentUser.getIdToken();
                    await setSessionCookie(idToken);

                    return { success: true, message: "Новий провайдер успішно зв'язаний з вашим обліковим записом!" };

                } catch (linkError: any) {
                    // Якщо зв'язування не вдалося (наприклад, через те, що email провайдера вже пов'язаний з іншим обліковим записом)
                    return {
                        success: false,
                        error: `Неможливо зв'язати провайдер. Спробуйте увійти через початковий метод. (Code: ${linkError.code})`
                    };
                }
            } else {
                // Якщо користувач НЕ залогінений, але пошта конфліктує, ми не можемо зв'язати.
                return {
                    success: false,
                    error: `Обліковий запис вже існує. Будь ласка, спочатку увійдіть через існуючий метод, щоб зв'язати провайдер.`
                };
            }
        }

        // 2. ІНШІ ПОМИЛКИ
        return { success: false, error: error.message };
    }
};

export const signInWithGoogle = () => signInWithSocialProvider(googleProvider);
export const signInWithGitHub = () => signInWithSocialProvider(githubProvider);