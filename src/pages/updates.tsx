// pages/index.js
import Head from "next/head";
import styles from "./../styles/updates.module.css";
import Layout from "hocs/layout";
import Footer from "@/components/footer";
const Updates = () => {
  const updates = [
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing eli  repellendus harum dolores vitae beatae reprehenderit hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut quis natus sit nisi amet ipsa omnis esse aspernatur ullam temporibus.   Delectus nostrum doloribus optio, voluptas maiores, deserunt atque provident cupiditate beatae ut doloremque?",
    },
    {
      title: "First update",
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
            content="A simple Updates with a Adzvisors theme built with Next.js"
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
                  action="https://plausible.us20.list-manage.com/subscribe/update?u=aa3638e2a24986bbda7c17506&amp;id=a307649d1b"
                  method="update"
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
            {updates.map((update, index) => (
              <Update
                key={index}
                title={update.title}
                content={update.content}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </Layout>
  );
};

const Update = ({ title, content }) => {
  return (
    <div className={styles.post}>
      <time>Jun 22, 2022</time>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Updates;
