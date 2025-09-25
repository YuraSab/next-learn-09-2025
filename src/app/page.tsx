import PostList from "@/components/PostListServer";
import {Suspense} from "react";
import SkeletonPostList from "@/components/SkeletonPostList";
import AddPostForm from "@/components/AddPostForm";
import PostListClient from "@/components/PostListClient";
import PostListServer from "@/components/PostListServer";

const Home = () => {

  return (
      <main className={"flex min-h-screen flex-col items-center p-24 w-full"}>
          {/* @ts-ignore */}
          <Suspense fallback={<SkeletonPostList/>}>
              <PostListServer/>
              {/*<PostListClient/>*/}
          </Suspense>
          <div className="mt-12 w-full max-w-2xl">
              <AddPostForm/>
          </div>
      </main>
  )
}

export default Home;