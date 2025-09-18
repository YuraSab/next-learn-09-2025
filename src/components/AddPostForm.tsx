'use client';

import {useRef} from "react";
import {useRouter} from "next/navigation";

const AddPostForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleSubmitAction = async  (formData: FormData) => {
        // Викликаємо Server Action напряму

        // Оновлюємо сторінку після успішної відправки
        router.refresh();
        formRef.current?.reset();

    }

    return (
        <form ref={formRef} action={handleSubmitAction} className="w-full max-w-lg mx-auto p-8 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Додати новий пост</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Заголовок</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="body" className="block text-gray-700 font-bold mb-2">Текст</label>
                <textarea
                    id="body"
                    name="body"
                    rows={4}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Відправити
                </button>
            </div>
        </form>
    );
}

export default AddPostForm;