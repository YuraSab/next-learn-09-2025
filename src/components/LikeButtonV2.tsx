'use client';

import React, {useOptimistic, useState, useTransition} from 'react';
import {likePost} from "@/actions/PostActions";
import {Heart} from "lucide-react";

interface Props {
    postId: string,
    initialLiked: boolean,
    initialLikeCount: number,
}



const LikeButtonV2 = ({ postId, initialLiked, initialLikeCount }: Props) => {
    // 1. Використовуємо локальний стан для негайного UX
    // const [isLiked, setIsLiked] = useState(initialLiked);
    // 2. Використовуємо useTransition для паралельних мутацій
    const [isPending, startTransition] = useTransition();

    // useOptimistic для керування тимчасовим станом UI
    const [optimisticState, addOptimistic] = useOptimistic(
        // Початковий стан: значення, передані з Server Component
        { isLiked: initialLiked, count: initialLikeCount },

        // Оновлююча функція (Updater): визначає, як змінювати стан після виклику addOptimistic
        (currentState, optimisticValue: { type: 'like' | 'unlike' }) => {
            const isLiking = optimisticValue.type === 'like';
            return {
                isLiked: isLiking,
                // Збільшуємо або зменшуємо лічильник залежно від типу дії
                count: isLiking ? currentState.count + 1 : currentState.count - 1
            };
        }
    );

    // const handleLike = () => {
    //     // Оптимістичне оновлення UI:
    //     // Змінюємо стан одразу, не чекаючи відповіді сервера
    //     setIsLiked((prev) => !prev);
    //
    //     // Запускаємо Server Action у transition
    //     startTransition(async () => {
    //         await likePost(postId);
    //         // After revalidation, the parent Server Component will re-render
    //         // and update the initialIsLiked prop on next mount,
    //         // but we rely on the optimistic update for immediate feedback.
    //     })
    // }

    const handleLike = () => {
        const actionType = optimisticState.isLiked ? 'unlike' : 'like';

        // 1. ОПТИМІСТИЧНЕ ОНОВЛЕННЯ: Миттєво змінюємо UI
        // addOptimistic({ type: actionType });

        // Запускаємо Server Action у transition
        startTransition(async () => {
            // ОПТИМІСТИЧНЕ ОНОВЛЕННЯ: Тепер цей виклик знаходиться всередині startTransition
            addOptimistic({ type: actionType });
            // Тут Server Action виконується і викликає revalidatePath
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
                fill={optimisticState.isLiked ? "red" : "none"}
                stroke={optimisticState.isLiked ? "red" : "gray"}
            />

            {/* Відображаємо оптимістичний лічильник */}
            <span className="text-gray-700 font-medium">
                {optimisticState.count}
            </span>
        </button>
    );
};

export default LikeButtonV2;