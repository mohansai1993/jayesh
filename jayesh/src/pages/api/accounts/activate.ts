import { API_URL } from "../../../config";
import axios from "axios";
import { REQUEST_HEADERS } from "../../../commonRequestHeader";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req?.method === "POST") {
    const { uid, token } = req?.body;
    const body = JSON.stringify({
      uid,
      token,
    });

    try {
      const copterRes = await axios.post(
        `${API_URL}/auth/users/activation/`,
        body,
        REQUEST_HEADERS
      );
      if (copterRes?.status === 200) {
        return res
          ?.status(200)
          ?.json({ success: "Account activation succeeded" });
      }
      return res?.status(copterRes?.status)?.json({
        error: "Account activation failed",
      });
    } catch (err) {
      return res?.status(500)?.json({
        error: "An error occurred during account activation",
      });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res?.status(405)?.json({
    error: `Method ${req.method} not allowed`,
  });
};
