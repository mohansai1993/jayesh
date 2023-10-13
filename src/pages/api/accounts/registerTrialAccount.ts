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
        `${API_URL}/user_waitlist`,
        body,
        REQUEST_HEADERS,
      );
      if (copterRes?.status === 200) {
        return res
          ?.status(copterRes?.status)
          ?.json({ success: copterRes?.data?.message });
      }
      return res?.status(copterRes?.status)?.json({
        error: copterRes?.data?.message,
      });
    } catch (err: any) {
      if (err?.response?.status === 409) {
        return res?.status(409)?.json({
          error: err?.response?.data?.message,
        });
      }
      return res?.status(500)?.json({
        error: err?.response?.data?.message,
      });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res?.status(405)?.json({ error: `Method ${req.method} not allowed` });
};
