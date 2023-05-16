const express = require('express');
const app = express();
require('dotenv').config
const cors = require('cors')

const authentication = require('./authentication/authentication.js');
const tokenChecker = require('./authentication/tokenChecker.js');

const users = require('./users.js');
const movimenti = require('./movimenti.js');
const liste = require('./liste.js');

//const categoria_movimenti = require('./categoria_movimenti.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())


app.use('/', express.static('static')); // expose also this folder



app.use((req, res, next) => {
    console.log(req.method + ' ' + req.url)
    next()
})

app.use('/api/v1/authentications', authentication);

//app.use('/api/v1/users', tokenChecker);
app.use('/api/v1/movimenti', tokenChecker);
app.use('/api/v1/liste', tokenChecker);
app.use('/api/v1/movimenti/categorie', tokenChecker);
// app.use('/api/v1/students/me', tokenChecker);



/**
 * Resource routing
 */

app.use('/api/v1/users', users);
app.use('/api/v1/movimenti', movimenti);
app.use('/api/v1/liste', liste);
//app.use('/api/v1/movimenti/categorie', categoria_movimenti);
// app.use('/api/v1/booklendings', booklendings);



/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;
