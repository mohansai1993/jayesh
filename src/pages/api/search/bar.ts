import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../../config";
import { AxiosResponse, AxiosRequestConfig } from "axios";

// eslint-disable-next-line import/no-anonymous-default-export

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (!access) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    const { search_query, workspace_name } = req.body;
    const body = JSON.stringify({
      search_query,
      workspace_name,
      client_id: "Dokodemo",
    });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access}`,
        },
      };
      const copterRes = await axios.post(`${API_URL}/search_bar`, body, config);
      if (copterRes.status === 200) {
        return res.status(copterRes.status).json({ result: copterRes.data });
      }
      return res.status(copterRes.status).json({
        error: "Adzviser search failed",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: err?.response?.data,
      });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
};
