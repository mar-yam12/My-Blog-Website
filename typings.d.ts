type Post = {
  title: string;
  summary: string;
  image: {
    asset: {
      _type: string;
      _ref: string;
    };
  };
  slug: string;
};