'use client';

import {usePosts} from "@/hooks/usePosts";
import PostItem from "@/components/PostItem";

const PostListClient = () => {
    const { posts, isLoading, isError, mutate } = usePosts();

    if ( isLoading ) return <div className={'text-blue-500'}>Loading...</div>;
    if ( isLoading ) return <div className={'text-red-500'}>Error!</div>;

    return (
        <div className={'space-y-4'}>
            <h4>Post list (client component with SWR):</h4>
            {
                posts?.map((post) => <PostItem post={post} key={post.id}/>)
            }
        </div>
    )
}

export default PostListClient;