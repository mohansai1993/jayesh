import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { REQUEST_HEADERS } from "../../../commonRequestHeader";
import { API_URL } from "../../../config";
import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req?.body;

    const body = JSON.stringify({
      email,
      password,
    });

    // set maxAge for stay logged(7 days). 
    const maxAge = 60 * 60 * 24 * 7;
    try {
      const copterRes = await axios.post(
        `${API_URL}/auth/jwt/create/`,
        body,
        REQUEST_HEADERS
      );
      if (copterRes?.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", copterRes?.data["access"], {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: maxAge,
            sameSite: "strict",
            path: "/",
          }),
          cookie.serialize("refresh", copterRes?.data["refresh"], {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: maxAge,
            sameSite: "strict",
            path: "/",
          }),
        ]);
        return res?.status(200)?.json({
          success: "Authentication succeeded",
          authCode: jwt.sign({ "email": email, "access_token": copterRes?.data["access"], "refresh_token": copterRes?.data["refresh"] }, process.env.JWT_SECRET)
        });
      }
      return res?.status(copterRes?.status)?.json({
        error: "Authentication failed",
      });
    } catch (err) {
      return res?.status(401)?.json({
        error: err?.response?.data,
      });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res?.status(405)?.json({ error: `Method ${req.method} not allowed` });
};