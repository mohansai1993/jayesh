// pages/index.js
import Head from "next/head";
import styles from "./../../public/assets/styles/Blog.module.css";
import MainLayout from "hocs/mainLayout";
const Updates = () => {
  const posts = [
    {
      title:
        "Is Google Analytics illegal? Several European Data Protection Authorities say so",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
      path: "/post1",
    },
    {
      title:
        "Is Google Analytics illegal? Several European Data Protection Authorities say so",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
      path: "/post1",
    },
  ];

  return (
    <MainLayout>
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
        </main>
        <div className={styles.border}></div>
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <div className={styles.post} key={index}>
              <Post key={index} title={post.title} content={post.content} />
              {/* <a href={post.path} className={styles.path}>
                Continue reading -&gt;
              </a> */}
              {index != posts.length - 1 && (
                <div className={styles.border}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

const Post = ({ title, content }: any) => {
  return (
    <div className={styles.flex}>
      <div>
        <time className={styles.time}>Jun 22, 2022</time>
      </div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
};

export default Updates;
