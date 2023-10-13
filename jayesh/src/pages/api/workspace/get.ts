import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../../config";
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req?.method === "GET") {
    const cookies = cookie?.parse(req?.headers?.cookie ?? "");
    const access = cookies?.access ?? false;


    if (access === false) {
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
      interface Account {
        name: string;
        type: string;
        info: string;
        token_secret_key: string;
      }
      
      interface Workspace {
        name: string;
        user_account: string;
        data_connection_accounts: Account[];
      }

      
      const copterRes = await axios.post(
        `${API_URL}/workspace/get`,
        {}, // empty body is fine because the access token is being sent
        config
      );
      if (copterRes?.status === 200) {
        // We need to delete sensitive information from the response
        copterRes?.data.forEach((workspace: any, index: number) => {
          delete workspace['user_account']
          workspace.data_connection_accounts.forEach((account: any, index: number) => {
            delete account['info']
            delete account['token_secret_key']
          })
        });
        return res?.status(200)?.json(copterRes?.data);
      }
      return res?.status(copterRes?.status)?.json({
        error: "Failed to get the list of workspaces",
      });
    } catch (error) {
      console.log(error)
      return res?.status(500)?.json({
        error: "An error occurred in getting workspace list",
      });
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res?.status(405)?.json({ error: `Method ${req?.method} not allowed` });
};
