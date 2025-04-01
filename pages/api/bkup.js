import fs from 'fs';
import path from 'path';
import {IncomingForm} from "formidable";

export const config = {
    api: {
        bodyParser: false, // Disables default body parser to handle file uploads manually
    },
};

export default async function handler(req, res) {
    console.log(req.method);
    if(req.method === 'POST') {
        try {
            console.log("post-bkup");
            const form = new IncomingForm();
            form.uploadDir = '/tmp'; // Temporary directory for uploads
            form.keepExtensions = true;

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error('❌ File upload error:', err);
                    return res.status(500).json({ error: 'File upload failed' });
                }

                // Get the uploaded file path
                const uploadedFile = files.db[0]; // Ensure this matches the field name in FormData ('db')

                if (!uploadedFile) {
                    return res.status(400).json({ error: 'No file received' });
                }

                // Define the destination path
                const destPath = path.join(process.cwd(), 'dermatiqDB.db'); // Save inside project folder

                // Move the file to the desired location
                fs.rename(uploadedFile.filepath, destPath, (err) => {
                    if (err) {
                        console.error('❌ Error moving file:', err);
                        return res.status(500).json({ error: 'Error saving file' });
                    }

                    console.log('✅ File uploaded and saved:', destPath);
                    return res.status(200).json({ message: 'Backup uploaded successfully!' });
                });
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    else if (req.method === 'GET') {
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
