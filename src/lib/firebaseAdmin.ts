// src/lib/firebaseAdmin.ts

import * as admin from 'firebase-admin';

// 1. Парсимо JSON з змінної середовища
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS || '{}');

// 2. Ініціалізація тільки якщо Admin SDK ще не ініціалізовано
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // databaseURL: "https://[YOUR-PROJECT-ID].firebaseio.com", // Не обов'язково для Firestore
    });
}

export const adminAuth = admin.auth(); // Експорт для верифікації токенів
export const adminDB = admin.firestore(); // Експорт для безпечних операцій з БД