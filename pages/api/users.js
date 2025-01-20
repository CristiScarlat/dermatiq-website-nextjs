import { getUsers, findUser } from "../../dbServices/users";

export default async function GET(req, res) {
    try {
        const loggedUser = req.headers['x-user-name'];
        const foundUser = await findUser(loggedUser);
        if(foundUser) {
            const users = await getUsers();
            return res.status(200).json({ users });
        }
        return res.status(401).json({ message: 'Unauthorized, wrong username' });
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}
