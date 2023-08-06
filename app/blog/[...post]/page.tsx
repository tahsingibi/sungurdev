import BlogPost from "@/src/container/Blog/Post";

export default async function Page({ params }: any) {

  return <BlogPost params={params} />
}