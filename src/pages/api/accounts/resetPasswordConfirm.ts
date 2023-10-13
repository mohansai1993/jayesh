import { API_URL } from "../../../config";
import axios from "axios";
import { REQUEST_HEADERS } from "../../../commonRequestHeader";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { uid, token, new_password, re_new_password } = req?.body;
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      const copterRes = await axios.post(
        `${API_URL}/auth/users/reset_password_confirm/`,
        body,
        REQUEST_HEADERS
      );
      if (copterRes?.status === 204) {
        return res
          ?.status(copterRes?.status)
          ?.json({ success: "Reset password confirmation succeeded" });
      }
      return res?.status(copterRes?.status)?.json({
        error: "Reset password confirmation failed",
      });
    } catch (err) {
      return res?.status(500)?.json({
        error: err?.response?.data,
      });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res?.status(405)?.json({ error: `Method ${req.method} not allowed` });
};
