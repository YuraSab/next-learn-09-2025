'use client';

import React, {useState, useTransition} from 'react';
import {likePost} from "@/actions/PostActions";
import {Heart} from "lucide-react";

interface Props {
    postId: string,
    initialLiked: boolean,
}



const LikeButtonV2 = ({ postId, initialLiked }: Props) => {
    // 1. Використовуємо локальний стан для негайного UX
    const [isLiked, setIsLiked] = useState(initialLiked);
    // 2. Використовуємо useTransition для паралельних мутацій
    const [isPending, startTransition] = useTransition();

    const handleLike = () => {
        // Оптимістичне оновлення UI:
        // Змінюємо стан одразу, не чекаючи відповіді сервера
        setIsLiked((prev) => !prev);

        // Запускаємо Server Action у transition
        startTransition(async () => {
            await likePost(postId);
            // After revalidation, the parent Server Component will re-render
            // and update the initialIsLiked prop on next mount,
            // but we rely on the optimistic update for immediate feedback.
        })
    }

    return (
        <button
            onClick={handleLike}
            disabled={isPending} // Запобігаємо подвійному кліку
            className={`transition-colors duration-200 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <Heart
                size={24}
                // Змінюємо колір залежно від локального стану isLiked
                fill={isLiked ? "red" : "none"}
                stroke={isLiked ? "red" : "gray"}
            />
        </button>
    );
};

export default LikeButtonV2;