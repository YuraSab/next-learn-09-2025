import {Params} from "@/types/Global";
import {doc, getDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";
import {notFound} from "next/navigation";
import {Post} from "@/types/Post";
import EditPostForm from "@/components/EditPost";

interface Props {
    params: Params
}

const EditPostPage = async ({ params }: Props) => {
    const { id } = params;

    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
        notFound();

    const post: Post = {
        id: id,
        userId: docSnap.get('userId'),
        title: docSnap.get('title'),
        body: docSnap.get('body'),
    };

    return (
        <div className={"flex min-h-screen flex-col items-center p-24"}>
            <h1 className="text-3xl font-bold mb-6">Edit post</h1>
            <EditPostForm post={post}/>
        </div>
    )
}

export default EditPostPage;