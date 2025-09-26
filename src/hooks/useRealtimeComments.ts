"use client";

import {useEffect, useState} from "react";
import {Comment} from "@/types/Comment";
import {collection, query, onSnapshot, orderBy} from "@firebase/firestore";
import {db} from "@/lib/firebase";

export const useRealtimeComments = (postId: string) => {

    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!postId) return;

        // 1. Отримуємо посилання на підколекцію 'comments'
        const commentsRef = collection(db, 'posts', postId, 'comments');
        // 2. Створюємо запит: сортуємо за датою створення
        const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));
        // 3. Встановлюємо Real-time Listener (onSnapshot)
        const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            const liveComments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            } as Comment)); // Приводимо до типу Comment
            setComments(liveComments);
            setIsLoading(false);
        }, (error) => {
            console.error("Error listening to comments:", error);
            setIsLoading(false);
        });

        // Очищення: Важливо відписатися від Listener при демонтажі компонента
        return () => unsubscribe();
    }, [postId]);

    return { comments, isLoading };
}