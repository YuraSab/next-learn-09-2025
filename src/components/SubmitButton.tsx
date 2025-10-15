"use client";

import React from 'react';
import {useFormStatus} from "react-dom";

interface Props {
    text: string,
}

const SubmitButton = ({ text }: Props) => {
    // Хук useFormStatus автоматично отримує статус форми, в яку він вкладений
    const { pending } = useFormStatus();

    return (
        <div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {/* Динамічний текст або спінер */}
                { pending ? "Processing..." : text}
            </button>
        </div>
    );
};

export default SubmitButton;