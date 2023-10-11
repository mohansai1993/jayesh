// pages/index.js
import Head from "next/head";
import styles from "./npost.module.css";
import Layout from "hocs/layout";
const Npost = () => {
  const posts = [
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
        <div>
          <article className={styles.article}>
            <a
              className="text-indigo-600 uppercase text-sm tracking-wide font-black"
              href="/blog"
            >
              ← All posts
            </a>
            <h1 className={styles.x}>
              Is Google Analytics illegal? Several European Data Protection
              Authorities say so
            </h1>
            <div className={styles.x}>
              <time className="uppercase text-xs text-gray-500 font-bold">
                Jul 6, 2023
              </time>
              <span className={styles.x}>
                • Written by
                <a className={styles.x} href="https://twitter.com/markosaric">
                  Marko Saric
                </a>
              </span>
            </div>
            <div className={styles.x}>
              <p>
                Is Google Analytics illegal? Yes, say the Austrian, French,
                Italian, Danish, Finnish, Norwegian, Swedish and other European
                Data Protection Authorities. Here’s why.
              </p>
              <ol className={styles.x}>
                <li>
                  <a
                    href="#google-analytics-is-illegal-say-european-dpas"
                    id="markdown-toc-google-analytics-is-illegal-say-european-dpas"
                  >
                    Google Analytics is illegal say European DPAs
                  </a>
                </li>
                <li>
                  <a
                    href="#we-choose-the-subscription-business-model-rather-than-surveillance-capitalism"
                    id="markdown-toc-we-choose-the-subscription-business-model-rather-than-surveillance-capitalism"
                  >
                    We choose the subscription business model rather than
                    surveillance capitalism
                  </a>
                </li>
              </ol>
            </div>
            <h2
              className={styles.x}
              id="google-analytics-is-illegal-say-european-dpas"
            >
              Google Analytics is illegal say European DPAs
            </h2>
            <p className={styles.x}>
              Max Schrems and the Noyb team have
              <a
                className={styles.link}
                href="https://noyb.eu/en/101-complaints-eu-us-transfers-filed"
              >
                filed 101 complaints
              </a>
              throughout Europe concerning sites using Google Analytics and
              Facebook Connect.
            </p>
            <p className={styles.x}>
              Austrian DPA was the first to decide that Google Analytics is
              illegal in January 2022. Similar decisions have since dropped in
              other EU member states including France, Italy, Denmark, Finland,
              Norway and Sweden.
            </p>
            <p className={styles.x}>
              Google Analytics is illegal because
              <a
                className={styles.link}
                href="https://en.wikipedia.org/wiki/CLOUD_Act"
              >
                the CLOUD Act
              </a>
              allows US authorities to demand personal data from Google,
              Facebook, Amazon and other US providers, even when they’re
              operating (or hosting that data) in another jurisdiction such as
              the EU.
            </p>
            <p>
              Most websites use Google Analytics, Facebook Connect and/or other
              US-owned cloud services. There were similar recent cases
              concerning the use of
              <a
                className={styles.link}
                href="https://noyb.eu/en/edps-sanctions-parliament-over-eu-us-data-transfers-google-and-stripe"
              >
                Stripe
              </a>
              and the use of
              <a
                className={styles.link}
                href="https://iapp.org/news/a/new-eu-data-blockage-as-german-court-would-ban-many-cookie-management-providers/"
              >
                Cookiebot / Akamai
              </a>
              .
            </p>
            <p>
              Here’s the full overview of the different rulings by the European
              Data Protection Authorities.
            </p>
            <h2
              className={styles.x}
              id="google-analytics-is-illegal-say-european-dpas"
            >
              Google Analytics is illegal say European DPAs
            </h2>
            <p className={styles.x}>
              Max Schrems and the Noyb team have
              <a
                className={styles.link}
                href="https://noyb.eu/en/101-complaints-eu-us-transfers-filed"
              >
                filed 101 complaints
              </a>
              throughout Europe concerning sites using Google Analytics and
              Facebook Connect.
            </p>
            <p className={styles.x}>
              Austrian DPA was the first to decide that Google Analytics is
              illegal in January 2022. Similar decisions have since dropped in
              other EU member states including France, Italy, Denmark, Finland,
              Norway and Sweden.
            </p>
            <p className={styles.x}>
              Google Analytics is illegal because
              <a
                className={styles.link}
                href="https://en.wikipedia.org/wiki/CLOUD_Act"
              >
                the CLOUD Act
              </a>
              allows US authorities to demand personal data from Google,
              Facebook, Amazon and other US providers, even when they’re
              operating (or hosting that data) in another jurisdiction such as
              the EU.
            </p>
            <p>
              Most websites use Google Analytics, Facebook Connect and/or other
              US-owned cloud services. There were similar recent cases
              concerning the use of
              <a
                className={styles.link}
                href="https://noyb.eu/en/edps-sanctions-parliament-over-eu-us-data-transfers-google-and-stripe"
              >
                Stripe
              </a>
              and the use of
              <a
                className={styles.link}
                href="https://iapp.org/news/a/new-eu-data-blockage-as-german-court-would-ban-many-cookie-management-providers/"
              >
                Cookiebot / Akamai
              </a>
              .
            </p>
            <p>
              Here’s the full overview of the different rulings by the European
              Data Protection Authorities.
            </p>
            <h2
              className={styles.x}
              id="google-analytics-is-illegal-say-european-dpas"
            >
              Google Analytics is illegal say European DPAs
            </h2>
            <p className={styles.x}>
              Max Schrems and the Noyb team have
              <a
                className={styles.link}
                href="https://noyb.eu/en/101-complaints-eu-us-transfers-filed"
              >
                filed 101 complaints
              </a>
              throughout Europe concerning sites using Google Analytics and
              Facebook Connect.
            </p>
            <p className={styles.x}>
              Austrian DPA was the first to decide that Google Analytics is
              illegal in January 2022. Similar decisions have since dropped in
              other EU member states including France, Italy, Denmark, Finland,
              Norway and Sweden.
            </p>
            <p className={styles.x}>
              Google Analytics is illegal because
              <a
                className={styles.link}
                href="https://en.wikipedia.org/wiki/CLOUD_Act"
              >
                the CLOUD Act
              </a>
              allows US authorities to demand personal data from Google,
              Facebook, Amazon and other US providers, even when they’re
              operating (or hosting that data) in another jurisdiction such as
              the EU.
            </p>
            <p>
              Most websites use Google Analytics, Facebook Connect and/or other
              US-owned cloud services. There were similar recent cases
              concerning the use of
              <a
                className={styles.link}
                href="https://noyb.eu/en/edps-sanctions-parliament-over-eu-us-data-transfers-google-and-stripe"
              >
                Stripe
              </a>
              and the use of
              <a
                className={styles.link}
                href="https://iapp.org/news/a/new-eu-data-blockage-as-german-court-would-ban-many-cookie-management-providers/"
              >
                Cookiebot / Akamai
              </a>
              .
            </p>
            <p>
              Here’s the full overview of the different rulings by the European
              Data Protection Authorities.
            </p>
            <h2
              className={styles.x}
              id="google-analytics-is-illegal-say-european-dpas"
            >
              Google Analytics is illegal say European DPAs
            </h2>
            <p className={styles.x}>
              Max Schrems and the Noyb team have
              <a
                className={styles.link}
                href="https://noyb.eu/en/101-complaints-eu-us-transfers-filed"
              >
                filed 101 complaints
              </a>
              throughout Europe concerning sites using Google Analytics and
              Facebook Connect.
            </p>
            <p className={styles.x}>
              Austrian DPA was the first to decide that Google Analytics is
              illegal in January 2022. Similar decisions have since dropped in
              other EU member states including France, Italy, Denmark, Finland,
              Norway and Sweden.
            </p>
            <p className={styles.x}>
              Google Analytics is illegal because
              <a
                className={styles.link}
                href="https://en.wikipedia.org/wiki/CLOUD_Act"
              >
                the CLOUD Act
              </a>
              allows US authorities to demand personal data from Google,
              Facebook, Amazon and other US providers, even when they’re
              operating (or hosting that data) in another jurisdiction such as
              the EU.
            </p>
            <p>
              Most websites use Google Analytics, Facebook Connect and/or other
              US-owned cloud services. There were similar recent cases
              concerning the use of
              <a
                className={styles.link}
                href="https://noyb.eu/en/edps-sanctions-parliament-over-eu-us-data-transfers-google-and-stripe"
              >
                Stripe
              </a>
              and the use of
              <a
                className={styles.link}
                href="https://iapp.org/news/a/new-eu-data-blockage-as-german-court-would-ban-many-cookie-management-providers/"
              >
                Cookiebot / Akamai
              </a>
              .
            </p>
            <p>
              Here’s the full overview of the different rulings by the European
              Data Protection Authorities.
            </p>
            <h2
              className={styles.x}
              id="google-analytics-is-illegal-say-european-dpas"
            >
              Google Analytics is illegal say European DPAs
            </h2>
            <p className={styles.x}>
              Max Schrems and the Noyb team have
              <a
                className={styles.link}
                href="https://noyb.eu/en/101-complaints-eu-us-transfers-filed"
              >
                filed 101 complaints
              </a>
              throughout Europe concerning sites using Google Analytics and
              Facebook Connect.
            </p>
            <p className={styles.x}>
              Austrian DPA was the first to decide that Google Analytics is
              illegal in January 2022. Similar decisions have since dropped in
              other EU member states including France, Italy, Denmark, Finland,
              Norway and Sweden.
            </p>
            <p className={styles.x}>
              Google Analytics is illegal because
              <a
                className={styles.link}
                href="https://en.wikipedia.org/wiki/CLOUD_Act"
              >
                the CLOUD Act
              </a>
              allows US authorities to demand personal data from Google,
              Facebook, Amazon and other US providers, even when they’re
              operating (or hosting that data) in another jurisdiction such as
              the EU.
            </p>
            <p>
              Most websites use Google Analytics, Facebook Connect and/or other
              US-owned cloud services. There were similar recent cases
              concerning the use of
              <a
                className={styles.link}
                href="https://noyb.eu/en/edps-sanctions-parliament-over-eu-us-data-transfers-google-and-stripe"
              >
                Stripe
              </a>
              and the use of
              <a
                className={styles.link}
                href="https://iapp.org/news/a/new-eu-data-blockage-as-german-court-would-ban-many-cookie-management-providers/"
              >
                Cookiebot / Akamai
              </a>
              .
            </p>
            <p>
              Here’s the full overview of the different rulings by the European
              Data Protection Authorities.
            </p>
            <div className={styles.x}>
              <span className="text-xs uppercase font-bold text-gray-500">
                Written by
                <a
                  className="uppercase text-xs text-indigo-600 font-bold hover:underline"
                  href="https://twitter.com/markosaric"
                >
                  Marko Saric
                </a>
              </span>
            </div>
          </article>
        </div>
        <main className={styles.main}>
          <div className={styles.grid}></div>
          <div>
            <div className="text-center ">
              <p className={styles.para}>
                Hi! We are Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Ab repellendus harum dolores vitae beatae reprehenderit
                hic autem aliquid nemo, eos eum nobis nam fugiat accusamus ut
                quis natus sit nisi amet ipsa omnis esse aspernatur ullam
                temporibus. Delectus nostrum doloribus optio, voluptas maiores,
                deserunt atque provident cupiditate beatae ut doloremque?
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
      </div>
    </Layout>
  );
};

export default Npost;
