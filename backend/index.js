const app = require('./app/app.js');
const mongoose = require('mongoose');
require('dotenv').config()

const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to Database');

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to Database:', error);
    });