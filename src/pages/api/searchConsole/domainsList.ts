import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../../config";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const {
      query: { access_token },
    } = req;

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
      const copterRes = await axios.get(
        `${API_URL}/google_search_console_domains?access_token=${access_token}`,
        config,
      );
      if (copterRes?.status === 200) {
        return res?.status(200)?.json(copterRes?.data);
      }
      return res?.status(copterRes?.status)?.json({
        error: "Failed to get Google Search Console domains",
      });
    } catch (error) {
      // To log any errors if the account hierarchy fails to load
      console.log(error);
      return res?.status(500)?.json({
        error: "An error occurred in search console domain data",
      });
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
};
