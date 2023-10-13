import { API_URL } from "../../../config";
import axios from "axios";
import { REQUEST_HEADERS } from "../../../commonRequestHeader";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req?.body;
    const body = JSON.stringify({ email });
    try {
      const copterRes = await axios.post(
        `${API_URL}/auth/users/reset_password/`,
        body,
        REQUEST_HEADERS,
      );
      if (copterRes?.status === 204) {
        return res?.status(copterRes?.status)?.end();
      }
      return res?.status(copterRes?.status)?.json({
        error: "Reset password request failed",
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
