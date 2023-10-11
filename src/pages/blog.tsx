// pages/index.js
import Head from "next/head";
import styles from "./Blog.module.css";
import Layout from "hocs/layout";
const Blog = () => {
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
          <h1 className={styles.title}>Welcome to the Adzvisors Blog</h1>
          <div>
            <div>
              <p>
                Hi! We are
                <a href="#"></a>
                and
                <a href="#">Marko</a>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                repellendus harum dolores vitae beatae reprehenderit hic autem
                aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus
                sit nisi amet ipsa omnis esse aspernatur ullam temporibus.
                Delectus nostrum doloribus optio, voluptas maiores, deserunt
                atque provident cupiditate beatae ut doloremque?
              </p>
              <div>
                <form
                  action="https://plausible.us20.list-manage.com/subscribe/post?u=aa3638e2a24986bbda7c17506&amp;id=a307649d1b"
                  method="post"
                  id="newsletter-signup"
                >
                  <input
                    type="email"
                    name="EMAIL"
                    required
                    placeholder="Enter your email"
                  />
                  <button>Subscribe</button>
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
      <time>Jun 22, 2022</time>
      <h2>{title}</h2>
      <p>{content}</p>
      <div>
        <a href="/npost">Continue reading -&gt;</a>
      </div>
    </div>
  );
};

export default Blog;
