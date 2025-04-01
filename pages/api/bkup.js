import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Serve the SQLite file back as a response after deploy
        const filePath = path.join(process.cwd(), 'dermatiqDB.db');
        console.log(filePath);
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename=dermatiqDB.db`);
            fs.createReadStream(filePath).pipe(res);
        } else {
            return res.status(404).json({ error: 'SQLite file not found' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
