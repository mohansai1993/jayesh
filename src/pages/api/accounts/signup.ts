import { API_URL } from "../../../config";
import axios from "axios";
import { REQUEST_HEADERS } from "../../../commonRequestHeader";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password, re_password } = req?.body;

    const body = JSON.stringify({
      name,
      email,
      password,
      re_password,
    });

    try {
      const copterRes = await axios.post(
        `${API_URL}/auth/users/`,
        body,
        REQUEST_HEADERS,
      );
      if (copterRes?.status === 201) {
        return res
          ?.status(copterRes?.status)
          ?.json({ success: "User created" });
      }
      return res?.status(copterRes?.status)?.json({
        error: "Account registration failed",
      });
    } catch (err: any) {
      return res?.status(500)?.json({
        error: err?.response?.data,
      });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res?.status(405)?.json({ error: `Method ${req.method} not allowed` });
};
