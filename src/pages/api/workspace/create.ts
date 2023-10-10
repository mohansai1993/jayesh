import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req?.headers?.cookie ?? "");
    const access = cookies?.access ?? false;

    if (access === false) {
      return res?.status(401)?.json({
        error: "User unauthorized to make this request",
      });
    }

    const {
      workspaceName,
      accounts,
    } = req?.body;

    const body = JSON.stringify({
      workspaceName,
      accounts,
    });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access}`,
          Accept: "application/json",
        },
      };
      const copterRes = await axios.post(
        `${API_URL}/workspace/create`,
        body,
        config
      );
      if (copterRes?.status === 200) {
        return res
          ?.status(copterRes?.status)
          ?.json({ success: "Your workspace has been created successfully." });
      }
      return res?.status(copterRes?.status)?.json({
        error: "An error occurred while attempting to create the workspace.",
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
