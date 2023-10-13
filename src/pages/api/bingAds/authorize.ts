import { API_URL } from "../../../config";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (!access) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    try {
      res.redirect(307, `${API_URL}/authorize_bing_ads`);
      return;
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        error: "An error occurred during Bing Ads authorization",
      });
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
};
