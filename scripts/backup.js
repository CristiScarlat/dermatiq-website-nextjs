
async function backupDatabase() {
    try {
        const response = await fetch('https://urchin-app-2j4nq.ondigitalocean.app/api/bkup');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('❌ Backup failed:', error.response?.data || error.message);
    }
}

// Run the backup before Git push
backupDatabase();