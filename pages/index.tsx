import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../components/Header';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';
import { Posts } from '../components/Posts';

interface Props {
  posts: [Post];
}

const Home: NextPage = ({ posts }: Props) => (
  // console.log(posts);
  <div className="mx-auto max-w-7xl">
    <Head>
      <title>Medium blog</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <div className="flex items-center justify-between border-y bg-yellow-400 py-10 lg:py-0">
      <div className="space-y-5 px-10 ">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4">
            Medium
          </span>{' '}
          is a place to write, read and connect
        </h1>
        <h2 className="">
          It's easy and free to post your thinking on any topic and connect with
          millions of readers
        </h2>
      </div>

      <img
        className="hidden h-32 md:inline-flex lg:h-full"
        src="http://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
        alt="logo"
      />
    </div>

    {/* Posts */}
    {/* <Posts /> */}
    <div
      className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2
        md:gap-6 md:p-6 lg:grid-cols-3"
    >
      {posts.map(post => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="group cursor-pointer overflow-hidden rounded-lg border">
            <img
              className="h-60 w-full object-cover
                transition-transform duration-200
                ease-in-out group-hover:scale-105 "
              src={urlFor(post.mainImage).url()!}
              alt="preview"
            />
            <div className="flex justify-between bg-white p-5">
              <div>
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-xs">
                  {post.description} by {post.author.name}
                </p>
              </div>

              <img
                className="h-12 w-12 rounded-full"
                src={urlFor(post.author.image).url()!}
                alt=""
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
}`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
