import { Oval } from "react-loader-spinner";
import { Colors } from "../../public/assets/colors";
import Layout from "../hocs/layout";
import { SyntheticEvent, useState } from "react";
import { errorToaster, successToaster } from "../utils";

const ContactUs = () => {
  const [isLoading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, message }),
    });

    if (response.ok) {
      successToaster("Your message has been sent successfully. Our team will contact you soon.");
    } else {
      errorToaster("Sorry, something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      <Layout title="Adzviser | Contact Us" content="Have a question or comment? Contact us today and our friendly team will be happy to assist you. We value your feedback and look forward to hearing from you. Get in touch now and let us know how we can help.">
        <div className="mx-auto auth__row">
          <div className="authSignup contactUs">
            <div className="authMain">
              <div className="authMain__title">
                <h2>Contact Us</h2>
                <p>We love to hear from you!</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div
                  className={"form-group"}
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <label htmlFor="f_name">First name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="f_name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <label htmlFor="l_name">Last name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="l_name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={"form-group"}>
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div className={"form-group"}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  className="authMain__button"
                  type="submit"
                  style={{ background: Colors.Primary, textAlign: "center" }}
                >
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <Oval
                        color={Colors.Secondary}
                        secondaryColor="#fff"
                        width={30}
                        height={30}
                      />
                    </div>
                  ) : (
                    <>{"Send message"}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ContactUs;
