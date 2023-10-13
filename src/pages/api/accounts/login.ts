import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { REQUEST_HEADERS } from "../../../commonRequestHeader";
import { API_URL } from "../../../config";
import jwt, { Secret } from "jsonwebtoken";

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
        REQUEST_HEADERS,
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

        // Add a check for email before signing the token
        if (email) {
          const authCode = jwt.sign(
            {
              email,
              access_token: copterRes?.data["access"],
              refresh_token: copterRes?.data["refresh"],
            },
            process.env.JWT_SECRET as Secret, // Use "as Secret" to assert the type
          );

          return res?.status(200)?.json({
            success: "Authentication succeeded",
            authCode,
          });
        }

        return res?.status(400)?.json({
          error: "Invalid email",
        });
      }

      return res?.status(copterRes?.status)?.json({
        error: "Authentication failed",
      });
    } catch (err: any) {
      return res?.status(401)?.json({
        error: err?.response?.data,
      });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res?.status(405)?.json({ error: `Method ${req.method} not allowed` });
};
