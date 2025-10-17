
import React from 'react';
import {doc, getDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";
import {Post} from "@/types/Post";
import {collection, getDocs} from "@firebase/firestore";
import {getAuthenticatedServerUID} from "@/lib/serverAuth";
import {likePost} from "@/actions/PostActions";
import LikeButtonV2 from "@/components/LikeButtonV2";

interface Props {
    postId: string,
}

const getLikeData = async (postId: string, uid: string | null): Promise<{ likeCount: number, isLiked: boolean }> => {
    // 1. Отримуємо список лайків
    const likeCollection = collection(db, 'posts', postId, 'likes');
    const likeSnap = await getDocs(likeCollection);
    // 2. Отримуємо кількість лайків
    const likeCount = likeSnap.size;
    // 3. Отримуємо значення чи юзер лайкнув (boolean)
    let isLiked: boolean = false;
    if (uid) {
        const userLikeRef = doc(db, 'posts', postId, 'likes', uid);
        const userLikeSnap = await getDoc(userLikeRef);
        isLiked = userLikeSnap.exists();
    }
    // 4. Повертаємо кількість лайків та чи лайкнув юзер
    return { likeCount, isLiked };
}

const LikesSection = async ({ postId }: Props) => {
    const uid = await getAuthenticatedServerUID();
    if ( !uid )
        return <h2>Error: no user found!</h2>

    const { likeCount, isLiked } = await getLikeData(postId, uid);

    return (
        <div>
            <div>
                <LikeButtonV2
                    postId={postId}
                    initialLiked={isLiked}
                    initialLikeCount={likeCount}
                />
            </div>
        </div>
    );
};

export default LikesSection;