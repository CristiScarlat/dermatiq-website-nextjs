import {findUser, patchUser} from "../../../dbServices/users";
import bcrypt from "bcryptjs";

async function GET (req, res) {
    try {
        const loggedUser = req.headers['x-user-name'];
        const foundUser = await findUser(loggedUser);
        if(foundUser && foundUser.id === Number(req.query.uid)) {
            return res.status(200).json({
                email: foundUser.email,
                username: foundUser.username,
                fullname: foundUser.fullname,
                phone: foundUser.phone,
                role: foundUser.role,
                id: foundUser.id
            });
        }
        return res.status(401).json({ message: 'Unauthorized, wrong username' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function PATCH (req, res) {
    try {
        const loggedUser = req.headers['x-user-name'];
        const foundUser = await findUser(loggedUser);
        const userData = JSON.parse(req.body);
        if(userData.password)userData.password = await bcrypt.hash(userData.password, 10);
        if((foundUser && foundUser.id === Number(req.query.uid)) || (userData.password && foundUser?.role === 'admin')) {
            await patchUser({...userData, id: req.query.uid})
            return res.status(201).json(userData);
        }
        return res.status(401).json({ message: 'Unauthorized, wrong username' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.status(200).end(); // Respond with 200 to OPTIONS requests
        return;
    }
    switch (req.method) {
        case 'GET':
            return GET(req, res);
        case 'PATCH':
            return PATCH(req, res);
        default:
            break;
    }
}