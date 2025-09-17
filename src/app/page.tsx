import PostList from "@/components/PostList";
import {Suspense} from "react";
import SkeletonPostList from "@/components/SkeletonPostList";

const Home = () => {

  return (
      <main className={"flex min-h-screen flex-col items-center p-24 w-full"}>
          {/* @ts-ignore */}
          <Suspense fallback={<SkeletonPostList/>} >
              <PostList />
          </Suspense>
      </main>
  )
}

export  default  Home;