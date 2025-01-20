import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUser } from "../../../dbServices/users";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = JSON.parse(req.body);
    console.log("body", req.body)
    // Find user
    const user = await findUser(username);
    console.log("user", user)
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.API_SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ token });
}
