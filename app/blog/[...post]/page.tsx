import BlogPost from "@/pages/Blog/Post";
import { formatDate, getBlogPost } from "@/utils";

export default async function Page({ params }: any) {
  const slug = params?.post[0];
  const _post = await getBlogPost(slug);

  const detail = await _post[0]
  const date = detail?.date ? detail?.date : null;
  const content = detail?.content?.rendered ? detail?.content?.rendered : null;
  const title = detail?.yoast_head_json.title.replace(' - Tahsin Bey', '');

  let post = {
    success: detail ? true : false,
    data: {
      date: formatDate(date),
      title: title,
      content: content,
      link: detail?.link,
    }
  }

  return <BlogPost post={post} />
}

