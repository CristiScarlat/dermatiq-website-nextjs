import bcrypt from 'bcryptjs';
import { addUser } from "../../../dbServices/users";

export default async function signup(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(password, hashedPassword);
    // Save user (you should use a database in production)
    await addUser(username, hashedPassword);

    return res.status(201).json({ message: 'User registered successfully' });
}
