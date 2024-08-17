const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

let storedNumbers = [];

app.get('/numbers/:numberid', async (req, res) => {
    const numberId = req.params.numberid;
    try {
        const response = await axios.get(http://third-party-server/numbers/${numberId});
        const newNumbers = response.data.numbers;

        // Filter out duplicates
        const uniqueNumbers = newNumbers.filter(num => !storedNumbers.includes(num));
        
        // Add new numbers to storedNumbers
        storedNumbers.push(...uniqueNumbers);
        
        // Maintain the window size
        while (storedNumbers.length > WINDOW_SIZE) {
            storedNumbers.shift(); // Remove the oldest number
        }

        // Calculate average
        const avg = storedNumbers.length > 0 ? (storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length).toFixed(2) : 0;

        // Prepare response
        const responseBody = {
            windowPrevState: storedNumbers.slice(0, -1), // All but the last
            windowCurrState: storedNumbers,
            numbers: newNumbers,
            avg: parseFloat(avg)
        };

        res.json(responseBody);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching numbers');
    }
});

app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});