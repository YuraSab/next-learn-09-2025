import PostList from "@/components/PostList";
import LikeButton from "@/components/LikeButton";
import { Post } from "@/types/Post";

const Home = () => {

  const posts: Post[] = [
    { id: 1, title: 'Мій перший пост', body: 'Текст першого поста.' },
    { id: 2, title: 'Next.js App Router', body: 'Вивчаємо новий роутер.' },
  ];

  return (
      <main className={"flex min-h-screen flex-col items-center p-24"}>
          {/* Server Component */}
          <PostList posts={posts}/>
          {/* Client Component */}
          <LikeButton/>
      </main>
  )

}

export  default  Home;