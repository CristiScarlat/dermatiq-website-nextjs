
async function backupDatabase() {
    try {
        const response = await fetch('http://localhost:3000/api/bkup');
        console.log('✅ Backup successful:', response.data.fileUrl);
    } catch (error) {
        console.error('❌ Backup failed:', error.response?.data || error.message);
    }
}

// Run the backup before Git push
backupDatabase();