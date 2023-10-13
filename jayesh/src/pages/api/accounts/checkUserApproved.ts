import { API_URL } from "../../../config";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { REQUEST_HEADERS } from "../../../commonRequestHeader";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req?.body;
  const body = JSON.stringify({ email });
  if (req.method === "POST") {
    try {
      const copterRes = await axios.post(
        `${API_URL}/user_approved`,
        body,
        REQUEST_HEADERS
      );
      if (copterRes?.status === 200) {
        return res?.status(200)?.json(copterRes?.data);
      }
    } catch (error) {
      return res?.status(500)?.json({
        error: "You don't have permission!",
      });
    }
  }
};
