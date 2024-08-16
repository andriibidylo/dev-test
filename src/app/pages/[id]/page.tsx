import axios from "axios";

export default async function Page({ params }: { params: { id: string } }) {
  let page = null;
  if (params.id) {
    const pageId = params.id.match(/^\d+/);
    if (pageId) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId[0]}?acf_format=standard&_fields=id,title,content,acf`
      );
      page = data;
    }
  }
  if (!page) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
