import fs from 'fs';
import path from 'path';
import {IncomingForm} from "formidable";
import admin from 'firebase-admin';

export const config = {
    api: {
        bodyParser: false, // Disables default body parser to handle file uploads manually
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log("post-bkup");
            const form = new IncomingForm();
            form.uploadDir = '/tmp'; // Temporary directory for uploads
            form.keepExtensions = true;

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error('❌ File upload error:', err);
                    return res.status(500).json({error: 'File upload failed'});
                }

                // Get the uploaded file path
                const uploadedFile = files.db[0]; // Ensure this matches the field name in FormData ('db')

                if (!uploadedFile) {
                    return res.status(400).json({error: 'No file received'});
                }

                // Define the destination path
                const destPath = path.join(process.cwd(), 'dermatiqDB.db'); // Save inside project folder

                // Move the file to the desired location
                fs.rename(uploadedFile.filepath, destPath, (err) => {
                    if (err) {
                        console.error('❌ Error moving file:', err);
                        return res.status(500).json({error: 'Error saving file'});
                    }

                    console.log('✅ File uploaded and saved:', destPath);
                    return res.status(200).json({message: 'Backup uploaded successfully!'});
                });
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    else if (req.method === 'GET') {

// Initialize Firebase Admin SDK
        const serviceAccount = JSON.parse(
            process.env.FIREBASE_SERVICE_ACCOUNT || '{}'
        );

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Set this in your environment variables
            });
        }

        const bucket = admin.storage().bucket();

        try {
            const filePath = path.join(process.cwd(), 'dermatiqDB.db'); // SQLite file location

            // Check if the SQLite file exists
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({error: 'SQLite file not found'});
            }

            const fileName = `dermatiq-bkup/dermatiqDB.db`; // Unique filename
            const fileUpload = bucket.file(fileName);

            // Upload file to Firebase Storage
            await fileUpload.save(fs.readFileSync(filePath), {
                metadata: {contentType: 'application/octet-stream'},
            });

            console.log(`✅ SQLite backup uploaded: ${fileName}`);

            res.status(200).json({
                message: 'Backup uploaded successfully!',
                fileUrl: `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${fileName}`,
            });
        } catch (error) {
            console.error('❌ Backup failed:', error);
            res.status(500).json({error: 'Backup failed'});
        }
    }
}
