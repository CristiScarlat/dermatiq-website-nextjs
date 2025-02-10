import {getUsers, findUser, addUser, deleteUser} from "../../../dbServices/users";
import bcrypt from "bcryptjs";

async function GET(req, res) {
    try {
        const loggedUser = req.headers['x-user-name'];
        const foundUser = await findUser(loggedUser);
        if(foundUser) {
            const users = await getUsers();
            const formatedUsers = users.map((user) => ({
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                fullName: user.fullname,
                role: user.role,
            }))
            return res.status(200).json({ users: formatedUsers });
        }
        return res.status(401).json({ message: 'Unauthorized, wrong username' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function POST(req, res) {
    try {
        const loggedUser = req.headers['x-user-name'];
        const foundUser = await findUser(loggedUser);
        if(foundUser) {
            const { user } = JSON.parse(req.body);
            // Hash password
            user.password = await bcrypt.hash(user.password, 10);
            await addUser(user);
            return res.status(201).json({ user });
        }
        return res.status(401).json({ message: 'Unauthorized, wrong username' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function DELETE(req, res) {
    try {
        const loggedUser = req.headers['x-user-name'];
        const foundUser = await findUser(loggedUser);
        if(foundUser) {
            const { userId } = JSON.parse(req.body);
            await deleteUser(userId)
            return res.status(201).json({ deleteUser });
        }
        return res.status(401).json({ message: 'Unauthorized, wrong username' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return GET(req, res);
        case 'POST':
            return POST(req, res);
        case 'DELETE':
            return DELETE(req, res);
        default:
            break;
    }
}