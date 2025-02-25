import {serialize} from "cookie";


export default async function handler(req, res) {
    res.setHeader('Set-Cookie', serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // Prevent CSRF
        maxAge: 0, // 1 hour
        path: '/', // Make cookie accessible for all routes
    }));

    return res.status(200).json({message: "Logged out successfully"});
}