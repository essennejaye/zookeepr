const fs = require('fs');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express(); // allows creation of routes to data

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// express middleware that instructs server to make certain files available when rendering html
app.use(express.static('public'));

const { json } = require('body-parser');




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});