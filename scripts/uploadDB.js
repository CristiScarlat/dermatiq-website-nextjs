const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Define the API endpoint and file path
const API_URL = 'http://localhost:3000/api/bkup'; // Replace with your actual API endpoint
const FILE_PATH = path.join(__dirname, '../dermatiqDB.db'); // Replace with your actual file path

// Function to upload the file
async function uploadFile() {
    try {
        // Ensure file exists
        if (!fs.existsSync(FILE_PATH)) {
            console.error('❌ File not found:', FILE_PATH);
            return;
        }

        // Create a FormData instance
        const formData = new FormData();
        formData.append('db', fs.createReadStream(FILE_PATH));

        // Send the request using axios
        const response = await axios.post(API_URL, formData, {
            headers: {
                ...formData.getHeaders(), // Required headers for multipart/form-data
            },
        });

        console.log('✅ File uploaded successfully!', response.data);
    } catch (error) {
        console.error('❌ File upload failed:', error.response?.data || error.message);
    }
}

// Run the upload function
uploadFile();
