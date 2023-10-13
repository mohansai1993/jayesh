import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { API_URL } from "../../config";
import axios from "axios";
import { REQUEST_HEADERS } from "../../commonRequestHeader";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { grant_type, client_id, client_secret, code, refresh_token } = req?.body;
        if (client_id !== process.env.OPENAI_CLIENT_ID) {
            return res.status(401).json({
                error: "Client ID does not match",
            });
        }
        if (client_secret !== process.env.OPENAI_CLIENT_SECRET) {
            return res.status(401).json({
                error: "Client secret does not match",
            });
        }
        try {
            if (grant_type === "authorization_code") {
                if (!code) {
                    return res?.status(400).json({ error: "Authorization code is required" })
                }
                const payload = jwt.verify(code, process.env.JWT_SECRET);

                const { access_token, refresh_token } = payload;
                if (!access_token) {
                    return res.status(401).json({
                        error: "User unauthorized to make this request",
                    });
                }
                return res?.status(200)?.json({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    token_type: "bearer",
                    expires_in: 60 * 60 * 24 * 7
                });
            } else if (grant_type === "refresh_token") {
                if (!refresh_token) {
                    return res?.status(400).json({ error: "Refresh token is required" })
                }
                const copterRes = await axios.post(
                    `${API_URL}/auth/jwt/refresh/`,
                    JSON.stringify({
                        "refresh": refresh_token,
                    }),
                    REQUEST_HEADERS
                );
                if (copterRes?.status === 200) {
                    return res?.status(200)?.json({
                        access_token: copterRes?.data["access"],
                        // Use the rotated refresh token
                        refresh_token: copterRes?.data["refresh"],
                        token_type: "bearer",
                        expires_in: 60 * 60 * 24 * 7
                    });
                }
                return res?.status(copterRes?.status)?.json({ error: "Fetching a new access token failed" })
            }

        } catch (err) {
            console.log(err)
            return res.status(401).json({
                error: "Oauth authentication failed",
            });
        }
    }
    res.setHeader('Allow', ['POST']);
    return res?.status(405)?.json({
        error: `Method ${req.method} not allowed`
    });
}