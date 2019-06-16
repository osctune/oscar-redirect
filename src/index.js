const express = require('express');
const asyncHandler = require('express-async-handler');
const { findUrl, mongo } = require('@nam3/oscar-util');

const app = express();

// Get enviorment variables.
const {
    PORT=1337,
    MONGO_URI,
} = process.env;

const connection = mongo(MONGO_URI);

app.get('/:hash', asyncHandler(async (req, res) => {
    await connection(async db => {
        const url = await findUrl(db, req.params.hash);
        if(url) {
            res.redirect(url);
        } else {
            res.redirect('/app');
        }
    });
}));

// Start server.
app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});