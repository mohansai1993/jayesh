import { API_URL } from "../../../config";
import cookie from "cookie";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req?.headers?.cookie ?? "");
    const access = cookies?.access ?? false;

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
      const copterRes = await axios.get(`${API_URL}/auth/users/me/`, config);

      if (copterRes?.status === 200) {
        const { name, email } = copterRes?.data;
        return res?.status(200)?.json({ name: name, email: email });
      }
      return res?.status(copterRes?.status)?.json({
        error: "Loading user failed",
      });
    } catch (err: any) {
      return res?.status(500)?.json({
        error: "An error occurred in loading user",
      });
    }
  }
  res?.setHeader("Allow", ["GET"]);
  return res?.status(405)?.json({
    error: `Method ${req.method} not allowed`,
  });
};
