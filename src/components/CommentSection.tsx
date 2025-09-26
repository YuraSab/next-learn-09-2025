'use client';

import {useRealtimeComments} from "@/hooks/useRealtimeComments";
import AddCommentForm from "@/components/AddCommentForm";

interface Props {
    postId: string,
}

const CommentSection = ({ postId }: Props) => {
    const { comments, isLoading } = useRealtimeComments(postId);

    return (
        <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Коментарі ({comments.length})</h2>

            <AddCommentForm postId={postId} />

            {isLoading && <p className="text-gray-500">Завантаження коментарів...</p>}

            <div className="space-y-4 mt-6">
                {!isLoading && comments.length === 0 && (
                    <p className="text-gray-500">Поки що коментарів немає. Будьте першими!</p>
                )}
                {comments.map((comment) => (
                    <div key={comment.id} className="p-3 border rounded-md bg-gray-50">
                        <p className="font-semibold text-sm">{comment.author}</p>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;