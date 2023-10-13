import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
        const { query: { subscription_id } } = req
        try {
            const lemonRes = await axios.delete(`https://api.lemonsqueezy.com/v1/subscriptions/${subscription_id}`, {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': `Bearer ${process.env.NODE_ENV === "production" ? process.env.LEMON_SQUEEZY_API_KEY_PROD : process.env.LEMON_SQUEEZY_API_KEY_TEST}`
                }
            });
            if (lemonRes?.status === 200) {
                return res?.status(lemonRes?.status)?.json({ success: "Your subscription has been cancelled successfully." });
            }
            // Process the response as required
            return res?.status(lemonRes?.status)?.json({ error: "An error occurred while attempting to cancel subscription." });
        } catch (error) {
            return res?.status(500)?.json({
                error: "An error occurred while attempting to cancel subscription.",
            });
        }
    }
}
