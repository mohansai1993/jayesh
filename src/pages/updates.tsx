// pages/index.js
import Head from "next/head";
import styles from "./updates.module.css";
import Layout from "hocs/layout";
const Updates = () => {
  const posts = [
    {
      title: "First Post",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First Post",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First Post",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First Post",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First Post",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First Post",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First Post",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
 
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Adzvisors</title>
          <meta
            name="description"
            content="A simple blog with a Adzvisors theme built with Next.js"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to the Adzvisors Updates</h1>
          <div>
            <div className="text-center ">
              <p className="content-text text-lg mt-6">
                Hi! We are
                <a className="text-indigo-600 hover:underline" href="#">
                  {" "}
                  Uku{" "}
                </a>
                and
                <a className="text-indigo-600 hover:underline" href="#">
                  {" "}
                  Marko{" "}
                </a>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                repellendus harum dolores vitae beatae reprehenderit hic autem
                aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus
                sit nisi amet ipsa omnis esse aspernatur ullam temporibus.
                Delectus nostrum doloribus optio, voluptas maiores, deserunt
                atque provident cupiditate beatae ut doloremque?
              </p>
              <div className="container  max-w-screen-sm mt-12">
                <form
                  className="mt-8 sm:flex justify-center"
                  action="https://plausible.us20.list-manage.com/subscribe/post?u=aa3638e2a24986bbda7c17506&amp;id=a307649d1b"
                  method="post"
                  id="newsletter-signup"
                >
                  <input
                    type="email"
                    name="EMAIL"
                    required
                    className="appearance-none w-full px-5 py-3 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:max-w-xs"
                    placeholder="Enter your email"
                  />
                  <button className="w-full flex items-center justify-center px-5  border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className={styles.grid}>
            {posts.map((post, index) => (
              <Post key={index} title={post.title} content={post.content} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

const Post = ({ title, content }) => {
  return (
    <div className={styles.post}>
      <time className="uppercase text-xs text-gray-500 font-bold">
        Jun 22, 2022
      </time>
      <h2>{title}</h2>
      <p>{content}</p>
      {/* <div>
        <a
          className="text-indigo-600 uppercase text-sm tracking-wide font-black content-link"
          href="/npost"
        >
          Continue reading -&gt;
        </a>
      </div> */}
    </div>
  );
};

// Post.js

// import "./Post.css"; // Import your CSS file for styling

export default Updates;
