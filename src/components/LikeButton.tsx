'use client'; // Ця директива робить компонент клієнтським

import {useState} from "react";

const LikeButton = () => {
    const [likes, setLikes] = useState<number>(0);

    const handleLike = () => {
        setLikes((prev) => prev + 1);
    }

    return (
        <button
            onClick={handleLike}
            className={"bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition-colors"}
        >
            Likes: {likes}
        </button>
    )
}

export  default LikeButton;