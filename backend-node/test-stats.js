import fetch from 'node-fetch';

async function testStats() {
    try {
        const response = await fetch('http://localhost:5000/api/resumes/stats');
        const data = await response.json();
        console.log('Stats Response:', data);
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

testStats();
