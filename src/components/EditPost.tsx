'use client';

import {Post} from "@/types/Post";
import {useRef} from "react";
import {useRouter} from "next/navigation";
import {updatePost} from "@/actions/PostActions";

interface Props {
    post: Post;
}

const EditPostForm = ({ post }: Props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleUpdate = async (formData: FormData) => {
        formData.append('id', post.id);
        await updatePost(formData);
        router.push(`/posts/${post.id}`);
    }

    return (
        <form ref={formRef} action={handleUpdate}
              className="w-full max-w-lg mx-auto p-8 border rounded-lg shadow-lg bg-white">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Заголовок</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={post.title} // Встановлюємо значення за замовчуванням
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
                    defaultValue={post.body} // Встановлюємо значення за замовчуванням
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Оновити пост
                </button>
            </div>
        </form>
    )
}

export default EditPostForm;