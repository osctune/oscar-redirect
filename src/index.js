const express = require('express');
const cors = require('cors');
const asyncHandler = require('express-async-handler');
const { findUrl, mongo } = require('@nam3/oscar-db');

const app = express();
app.use(cors());

// Get enviorment variables.
const {
    PORT = 1337,
    MONGO_URI,
    MONGO_DBNAME,
} = process.env;

const connection = mongo(MONGO_URI, MONGO_DBNAME);

app.get('/:hash', asyncHandler(async (req, res) => {
    await connection(async db => {
        const { hash } = req.params;

        const target = await findUrl(db, hash);

        if(!target) {
            res.status(404).end();
            return;
        }

        res.redirect(target);
    });
}));

// Start server.
app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});