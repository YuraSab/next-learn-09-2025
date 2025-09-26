'use client';

import {FormEvent, useRef} from "react";
import {addComment} from "@/actions/PostActions";
import {ServerActionResults} from "@/types/Global";

interface Props {
    postId: string,
}

const AddCommentForm = ({ postId }: Props) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Створюємо FormData вручну
        const formData = new FormData(event.currentTarget);
        // Додаємо ID поста до FormData, щоб Server Action знав, куди писати
        formData.append('postId', postId);
        const result = await addComment(formData as FormData) as ServerActionResults;

        if ( result.success ) {
            formRef.current?.reset();
        } else {
            alert(result.error);
        }
    }

    return (
        // Використовуємо onSubmit замість action
        <form ref={formRef} onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-sm bg-white mb-6">
            <h3 className="text-lg font-semibold mb-3">Залишити коментар</h3>
            <textarea
                name="text"
                rows={3}
                required
                placeholder="Ваш коментар..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
                type="submit"
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Надіслати
            </button>
        </form>
    );
}

export default AddCommentForm;