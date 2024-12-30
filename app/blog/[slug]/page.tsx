import Image from "next/image";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
// import { components } from "@/components/CustomComponent";
import CommentSection from "@/components/CommentSection";

export const revalidate = 60; // seconds

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  const query = `*[_type=='post']{
    "slug": slug.current
  }`;
  const slugs = await client.fetch(query);
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }));
}

// Blog post page
export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const query = `*[_type=='post' && slug.current == $slug]{
    title, summary, image, content,
    author->{bio, image, name}
  }[0]`;
  const post = await client.fetch(query, { slug });

  // Fallback if no post is found
  if (!post) {
    return <h1 className="text-center mt-12">Post not found!</h1>;
  }

  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">
      {/* Blog Title */}
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
        {post.title}
      </h1>

      {/* Featured Image */}
      {post.image && (
        <Image
          src={urlForImage(post.image)} // `urlForImage` returns a string, so no `.url()` is needed.
          width={800}
          height={500}
          alt="Blog featured image"
          className="rounded"
        />
      )}

      {/* Blog Summary Section */}
      <section>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-cyan-500">
          Summary
        </h2>
        <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
          {post.summary}
        </p>
      </section>

      {/* Author Section */}
      {post.author && (
        <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
          {post.author.image && (
            <Image
              src={urlForImage(post.author.image)} // `urlForImage` returns a string directly.
              width={200}
              height={200}
              alt="Author image"
              className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
            />
          )}
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-dark dark:text-light">
              {post.author.name}
            </h3>
            <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
              {post.author.bio}
            </p>
          </div>
        </section>
      )}

      {/* Main Body of Blog */}
      <section
        className="text-lg space-y-5 leading-normal text-dark/80 dark:text-light/80
        prose-h4:text-accentDarkPrimary prose-h4:text-3xl prose-h4:font-semibold
        prose-li:list-disc prose-li:list-inside prose-li:marker:text-accentDarkSecondary
        prose-strong:text-dark dark:prose-strong:text-white"
      >
        <PortableText value={post.content} />
      </section>

      {/* Comment Section */}
      <CommentSection />
    </article>
  );
}
