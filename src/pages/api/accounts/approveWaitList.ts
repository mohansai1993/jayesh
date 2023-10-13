import { API_URL } from "../../../config";
import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req?.body;
  const body = JSON.stringify({ email });
  if (req.method === "PUT") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (!access) {
      return res?.status(401)?.json({
        error: "User unauthorized to make this request",
      });
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access}`,
          Accept: "application/json",
        },
      };
      const copterRes = await axios.put(
        `${API_URL}/user_waitlist`,
        body,
        config,
      );
      if (copterRes?.status === 200) {
        return res?.status(200)?.json(copterRes?.data);
      }
      return res?.status(copterRes?.status)?.json({
        error: "Failed to get user waitList accounts",
      });
    } catch (error) {
      return res?.status(500)?.json({
        error: "An error occurred in get user waitList accounts data",
      });
    }
  }
};
