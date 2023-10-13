import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../../config";
import cookie from "cookie";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const {
      query: { long_lived_token, token_key },
    } = req;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access}`,
          Accept: "application/json",
        },
      };
      const copterRes = await axios.get(
        `${API_URL}/facebook_page_long_lived_token?long_lived_token=${long_lived_token}&token_key=${token_key}`,
        config,
      );
      return res.status(200).json({
        success: true,
      });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        error: "An error occurred when retrieving the long lived page token",
      });
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
};
