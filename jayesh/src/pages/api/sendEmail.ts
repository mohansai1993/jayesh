import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'zeyuan.goo@gmail.com',
                pass: 'tichiptgzrasfqco',
            },
        });

        const mailOptions = {
            from: 'zeyuan.goo@gmail.com',
            to: 'zeyuan.gu@adzviser.com',
            subject: 'Adzviser Contact Us Form - New Message',
            html: `First name: ${firstName}<br>Last name: ${lastName}<br>Email: ${email}<br>Message: ${message}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Something went wrong. Please try again later.');
            } else {
                res.status(200).send('Message sent successfully!');
            }
        });
    }
    else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}