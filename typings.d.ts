type Post = {
    title:string,
    summary:string,
    image:any,
    slug:string
}

type PageProps = {
    params: {
      slug: string;
    };
  };