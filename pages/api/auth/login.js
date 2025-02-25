import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUser } from "../../../dbServices/users";
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = JSON.parse(req.body);

    // Find user
    const user = await findUser(username);
    console.log(username, password )
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log(password, user);
        return res.status(401).json({ message: 'Invalid credentials, wrong password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username, role: user.role, id: user.id }, process.env.API_SECRET_KEY, { expiresIn: '1h' });
    res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: true, // Use secure cookies in production
        sameSite: "None",
        maxAge: 3600, // 1 hour
        path: '/', // Make cookie accessible for all routes
    }));

    return res.status(200).json({message:"Successfully logged in", isAuthenticated: isMatch, role: user.role, username: user.username});
}
