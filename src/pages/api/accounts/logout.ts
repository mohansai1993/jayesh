import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                'access', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            }
            ),
            cookie.serialize(
                'refresh', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            }),
            cookie.serialize('uuid', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            })
        ]);
        return res?.status(200)?.json({
            success: 'Log out succeeded'
        });
    }
    res.setHeader('Allow', ['POST']);
    return res?.status(405)?.json({
        error: `Method ${req.method} not allowed`
    });
}